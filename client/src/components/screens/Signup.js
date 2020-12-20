import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
const SignUp = () => {
    const history = useHistory();
    const [name, setName] = useState('');
    const [password, setPasword] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState(undefined);
    useEffect(() => {
        if (url) {
            uploadFields();
        }
    }, [url]);
    const uploadPic = () => {
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
    const uploadFields = () => {
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                email,
            )
        ) {
            M.toast({ html: 'invalid email', classes: '#c62828 red darken-3' });
            return;
        }
        fetch('/signup', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                password,
                email,
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
                        html: data.message,
                        classes: '#43a047 green darken-1',
                    });
                    history.push('/signin');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const PostData = () => {
        if (image) {
            uploadPic();
        } else {
            uploadFields();
        }
    };

    return (
        <div className="d--flex justify-content--center align-items--center mt--4">
            <div className="form">
                <h1 className="form__title">LiVi</h1>
                <div className="form__ele">
                    <input
                        type="text"
                        placeholder="Name"
                        className="form__input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form__ele">
                    <input
                        type="text"
                        placeholder="Email"
                        className="form__input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form__ele">
                    <input
                        type="password"
                        placeholder="Password"
                        className="form__input"
                        value={password}
                        onChange={(e) => setPasword(e.target.value)}
                    />
                </div>
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
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
                <div className="form__ele">
                    <button
                        className="btn btn__login"
                        onClick={() => PostData()}
                    >
                        Đăng ký
                    </button>
                </div>
                <p className="form__text">
                    Bằng cách đăng ký, bạn đồng ý với Điều khoản , Chính sách Dữ
                    liệu và Chính sách Cookie của chúng tôi .
                </p>
                <p>
                    Đã có tài khoản?&nbsp;
                    <Link to="/signin">Đăng nhập</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
