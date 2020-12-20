import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';
const Profile = () => {
    const [userProfile, setProfile] = useState(null);

    const { state, dispatch } = useContext(UserContext);
    const { userid } = useParams();
    const [showfollow, setShowFollow] = useState(
        state ? !state.following.includes(userid) : true,
    );
    useEffect(() => {
        fetch(`/user/${userid}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                //console.log(result)

                setProfile(result);
            });
    }, []);

    const followUser = () => {
        fetch('/follow', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                followId: userid,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: 'UPDATE',
                    payload: {
                        following: data.following,
                        followers: data.followers,
                    },
                });
                localStorage.setItem('user', JSON.stringify(data));
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id],
                        },
                    };
                });
                setShowFollow(false);
            });
    };
    const unfollowUser = () => {
        fetch('/unfollow', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
            body: JSON.stringify({
                unfollowId: userid,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                dispatch({
                    type: 'UPDATE',
                    payload: {
                        following: data.following,
                        followers: data.followers,
                    },
                });
                localStorage.setItem('user', JSON.stringify(data));

                setProfile((prevState) => {
                    const newFollower = prevState.user.followers.filter(
                        (item) => item != data._id,
                    );
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower,
                        },
                    };
                });
                setShowFollow(true);
            });
    };

    return (
        <>
            {userProfile ? (
                <div class="container profile mt--5">
                    <header class="profile__header d--flex">
                        <div class="profile__image">
                            <img src={userProfile.user.pic} />
                        </div>
                        <div class="profile__info d--flex align-items--center">
                            <div>
                                <h2 class="profile__info__name">
                                    <span className="text--bold">
                                        {userProfile.user.name}
                                    </span>
                                </h2>
                                <h2 class="profile__info__name">
                                    Email:{' '}
                                    <span className="text--bold">
                                        {userProfile.user.email}
                                    </span>
                                </h2>
                                <ul class="profile__info__list">
                                    <li>
                                        <span>
                                            <span className="text--bold">
                                                {userProfile.posts.length}
                                            </span>{' '}
                                            Bài viết
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <span className="text--bold">
                                                {
                                                    userProfile.user.followers
                                                        .length
                                                }
                                            </span>{' '}
                                            Người theo dõi
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                            <span className="text--bold">
                                                {
                                                    userProfile.user.following
                                                        .length
                                                }
                                            </span>{' '}
                                            Đang theo dõi
                                        </span>
                                    </li>
                                </ul>
                                {showfollow ? (
                                    <button
                                        className="btn waves-effect waves-light #64b5f6 blue darken-1 mt--1"
                                        onClick={() => followUser()}
                                    >
                                        Theo dõi
                                    </button>
                                ) : (
                                    <button
                                        className="btn waves-effect waves-light #64b5f6 blue darken-1 mt--1"
                                        onClick={() => unfollowUser()}
                                    >
                                        Bỏ theo dõi
                                    </button>
                                )}
                            </div>
                        </div>
                    </header>
                    <div class="profile__body d--flex justify-content--space-between">
                        {userProfile.posts.map((item) => {
                            return (
                                <div class="profile__item">
                                    <img
                                        key={item._id}
                                        className="item"
                                        src={item.photo}
                                        alt={item.title}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <h2 className="mt--4 form__title">Đang tải...!</h2>
            )}
        </>
    );
};

export default Profile;
