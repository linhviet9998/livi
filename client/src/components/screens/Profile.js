import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
    const [mypics, setPics] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    const [image, setImage] = useState('');
    useEffect(() => {
        fetch('/mypost', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('jwt'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                setPics(result.mypost);
            });
    }, []);
    useEffect(() => {
        if (image) {
            const data = new FormData();
            data.append('file', image);
            data.append('upload_preset', 'livi9998');
            data.append('cloud_name', 'livi9998');
            fetch('https://api.cloudinary.com/v1_1/livi9998/image/upload', {
                method: 'post',
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    fetch('/updatepic', {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization:
                                'Bearer ' + localStorage.getItem('jwt'),
                        },
                        body: JSON.stringify({
                            pic: data.url,
                        }),
                    })
                        .then((res) => res.json())
                        .then((result) => {
                            console.log(result);
                            localStorage.setItem(
                                'user',
                                JSON.stringify({ ...state, pic: result.pic }),
                            );
                            dispatch({
                                type: 'UPDATEPIC',
                                payload: result.pic,
                            });
                            //window.location.reload()
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [image]);
    const updatePhoto = (file) => {
        setImage(file);
    };
    return (
        <div class="container profile mt--5">
            <header class="profile__header d--flex">
                <div class="profile__image">
                    <div className="file-field input-field">
                        <span>
                            <img src={state ? state.pic : 'loading'} />
                            <span className="add-icon">
                                <span>+</span>
                            </span>
                        </span>
                        <input
                            type="file"
                            onChange={(e) => updatePhoto(e.target.files[0])}
                        />
                    </div>
                </div>
                <div class="profile__info d--flex align-items--center">
                    <div>
                        <h2 class="profile__info__name">
                            <span className="text--bold">
                                {state ? state.name : 'loading'}
                            </span>
                        </h2>
                        <h2 class="profile__info__name">
                            Email:{' '}
                            <span className="text--bold">
                                {state ? state.email : 'loading'}
                            </span>
                        </h2>
                        <ul class="profile__info__list">
                            <li>
                                <span>
                                    <span className="text--bold">
                                        {mypics.length}
                                    </span>{' '}
                                    Bài viết
                                </span>
                            </li>
                            <li>
                                <span>
                                    <span className="text--bold">
                                        {state ? state.followers.length : '0'}
                                    </span>{' '}
                                    Người theo dõi
                                </span>
                            </li>
                            <li>
                                <span>
                                    <span className="text--bold">
                                        {state ? state.following.length : '0'}
                                    </span>{' '}
                                    Đang theo dõi
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div class="profile__body d--flex justify-content--space-between">
                {mypics.map((item) => {
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
    );
};

export default Profile;
