import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
    const result = await firebase
        .firestore()
        .collection('users')
        .where('username','==', username)
        .get();

    return result.docs.map((user) => user.data().length > 0);
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
    const result = await firebase.firestore().collection('users').where('userId','==', userId).get();
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebase.firestore().collection('users').limit(10).get();

    // make sure users profile and their following are not shown on suggested profiles
    return result.docs
        .map((user) => ({ ...user.data(), docId: user.id }))
        .filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document
    profileId, // the user that ken requests to follow
    isFollowingProfile // true/false (am i currently folling this person?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile
                ? FieldValue.arrayRemove(profileId)
                : FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(
    profileDocId, // currently logged in user document
    loggedInUserDocId, // the user that ken requests to follow
    isFollowingProfile // true/false (am i currently folling this person?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile
                ? FieldValue.arrayRemove(loggedInUserDocId)
                : FieldValue.arrayUnion(loggedInUserDocId)
        });
}

export async function getPhotos(userId, following) {
    // [5,4,2] => following
    const result = await firebase
        .firestore()
        .collection('photos')
        .where('userId', 'in', following)
        .get();

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            // photo.userID = 2
            const user = await getUserByUserId(photo.userId);
            // raphael
            const { username } = user[0];
            return { username, ...photo, userLikedPhoto };
        })
    );

    return photosWithUserDetails;
}