import React, { useState, useEffect } from 'react';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';
const CretePost = () => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    useEffect(() => {
        if (url) {
            fetch('/createpost', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('jwt'),
                },
                body: JSON.stringify({
                    title,
                    body,
                    pic: url,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.error) {
                        M.toast({
                            html: data.error,
                            classes: '#c62828 red darken-3',
                        });
                    } else {
                        M.toast({
                            html: 'Created post Successfully',
                            classes: '#43a047 green darken-1',
                        });
                        history.push('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [url]);

    const postDetails = () => {
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
                setUrl(data.url);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="d--flex justify-content--center align-items--center mt--7">
            <div className="form">
                <h2 className="form__title-small">Bài viết mới</h2>
                <label>
                    <div className="form__ele border--none">
                        <div className="file-field input-field">
                            <div className="btn #64b5f6 blue darken-1">
                                <span>
                                    T
                                    <span className="text--lowercase">
                                        ải ảnh lên
                                    </span>
                                </span>
                                <input
                                    className="form__input"
                                    type="file"
                                    onChange={(e) =>
                                        setImage(e.target.files[0])
                                    }
                                />
                            </div>
                            <div className="file-path-wrapper">
                                <input
                                    className="file-path validate"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                </label>
                <label className="form__label">
                    <span>Tiêu đề</span>
                    <div className="form__ele">
                        <input
                            type="text"
                            className="form__input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                </label>
                <label className="form__label">
                    <span>Nội dung</span>
                    <div className="form__ele">
                        <textarea
                            className="form__input"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>
                    </div>
                </label>
                <div className="form__ele">
                    <button
                        className="btn btn__login"
                        onClick={() => postDetails()}
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CretePost;
