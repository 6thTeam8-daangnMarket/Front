import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actionCreators as postActions } from "../redux/modules/post";

const Modal = (props) => {
    const { open, close, header } = props;
    const history = useHistory();
    const dispatch = useDispatch();
    const postId = props.postId;
    const postID = parseInt(postId);

    const delete_post =() => {
        dispatch(postActions.deletePost(postId));
    }
    const update_post = (postId) => {
        history.push(`/post/edit/${postID}`);
    }
    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open? 'openModal modal' : 'modal'}>
            {
                open? (
                    <section>
                        <header>
                            {header}
                            <button className="close" onClick={close}>&times;</button>
                        </header>
                        <main>
                            <button onClick={update_post}>수정하기</button>
                            <button onClick={delete_post}>삭제하기</button>
                        </main>
                    </section>
                ) : null
            }
        </div>
    )
}
export default Modal;