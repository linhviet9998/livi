import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
const Home = () => {
    const [data, setData] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    useEffect(() => {
        fetch('/getsubpost', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setData(result.posts);
            });
    }, []);

    const likePost = (id) => {
        fetch('/like', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((item) => {
                    if (item._id == result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                console.log(newData);
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const unlikePost = (id) => {
        fetch('/unlike', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                //   console.log(result)
                const newData = data.map((item) => {
                    if (item._id == result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const makeComment = (text, postId) => {
        fetch('/comment', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                postId,
                text,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                const newData = data.map((item) => {
                    if (item._id == result._id) {
                        return result;
                    } else {
                        return item;
                    }
                });
                setData(newData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deletePost = (postid) => {
        fetch(`/deletepost/${postid}`, {
            method: 'delete',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                const newData = data.filter((item) => {
                    return item._id !== result._id;
                });
                setData(newData);
            });
    };
    return (
        <main className="main mt--5">
            <div className="container">
                {data.map((item) => {
                    return (
                        <article className="card" key={item._id}>
                            <div className="card__header d--flex align-items--center justify-content--space-between">
                                <a
                                    href="#"
                                    className="d--flex align-items--center"
                                >
                                    <div className="card__title">
                                        <Link
                                            to={
                                                item.postedBy._id !== state._id
                                                    ? '/profile/' +
                                                      item.postedBy._id
                                                    : '/profile'
                                            }
                                        >
                                            {item.postedBy.name}
                                        </Link>
                                    </div>
                                </a>
                                <div
                                    href="#"
                                    className="d--flex justify-content--end"
                                >
                                    {item.postedBy._id == state._id && (
                                        <i
                                            className="material-icons cursor--pointer"
                                            onClick={() => deletePost(item._id)}
                                        >
                                            delete
                                        </i>
                                    )}
                                </div>
                            </div>
                            <div className="card__body">
                                <div className="card__thumb">
                                    <img src={item.photo} />
                                </div>
                                <div className="like-icon d--flex align-items--center">
                                    {item.likes.includes(state._id) ? (
                                        <i
                                            className="material-icons color--red cursor--pointer"
                                            onClick={() => {
                                                unlikePost(item._id);
                                            }}
                                        >
                                            favorite
                                        </i>
                                    ) : (
                                        <i
                                            className="material-icons cursor--pointer"
                                            onClick={() => {
                                                likePost(item._id);
                                            }}
                                        >
                                            favorite_border
                                        </i>
                                    )}
                                    <p>
                                        &nbsp;&nbsp;
                                        {item.likes.length}
                                        &nbsp; lượt thích
                                    </p>
                                </div>
                                <div className="post-comment">
                                    <span className="post-comment__name">
                                        {item.title}
                                    </span>
                                    &nbsp;
                                    <span className="post-comment__content">
                                        {item.body}
                                    </span>
                                </div>
                                <div className="post-comment">
                                    {item.comments.map((record) => {
                                        return (
                                            <h6 key={record._id}>
                                                <span className="post-comment__name">
                                                    {record.postedBy.name}
                                                </span>{' '}
                                                <span className="post-comment__content">
                                                    {record.text}
                                                </span>
                                            </h6>
                                        );
                                    })}
                                </div>
                                <form
                                    className="comment"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        makeComment(
                                            e.target[0].value,
                                            item._id,
                                        );
                                    }}
                                >
                                    <input
                                        type="text"
                                        placeholder="Thêm 1 bình luận…"
                                    />
                                </form>
                            </div>
                        </article>
                    );
                })}
            </div>
        </main>
    );
};

export default Home;
