import { useRef } from "react";
import PropTypes from "prop-types";

export default function Post({ content }) {
    console.log('content', content);
    return <p>I am a post</p>;
}

Post.propTypes = {
    content: PropTypes.shape({})
};