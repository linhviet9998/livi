import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';
import '../main';
const NavBar = () => {
    const searchModal = useRef(null);
    const [search, setSearch] = useState('');
    const [userDetails, setUserDetails] = useState([]);
    const { state, dispatch } = useContext(UserContext);
    const history = useHistory();
    useEffect(() => {
        M.Modal.init(searchModal.current);
    }, []);

    const fetchUsers = (query) => {
        setSearch(query);
        fetch('/search-users', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
            }),
        })
            .then((res) => res.json())
            .then((results) => {
                setUserDetails(results.user);
            });
    };
    return (
        <nav className="nav fixed d--flex align-items--center">
            <div className="container d--flex align-items--center">
                <div className="logo d--flex align-items--center">
                    <Link to={state ? '/' : '/signin'}>LiVi</Link>
                </div>
                <div className="search">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="search__input modal-trigger"
                        data-target="modal1"
                    />
                    <div id="modal1" className="modal" ref={searchModal}>
                        <div className="modal-content">
                            <input
                                type="text"
                                placeholder="Tìm người dùng"
                                value={search}
                                onChange={(e) => fetchUsers(e.target.value)}
                            />
                            <ul className="collection">
                                {userDetails.map((item) => {
                                    return (
                                        <Link
                                            to={
                                                item._id !== state._id
                                                    ? '/profile/' + item._id
                                                    : '/profile'
                                            }
                                            onClick={() => {
                                                M.Modal.getInstance(
                                                    searchModal.current,
                                                ).close();
                                                setSearch('');
                                            }}
                                        >
                                            <li
                                                className="collection-item"
                                                style={{ color: 'black' }}
                                            >
                                                {item.email}
                                            </li>
                                        </Link>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="modal-close waves-effect waves-green btn-flat"
                                onClick={() => setSearch('')}
                            >
                                close
                            </button>
                        </div>
                    </div>
                </div>
                <div className="info d--flex justify-content--end align-items--center">
                    <div className="info__ele">
                        <Link to="/">
                            <i className="material-icons">home</i>
                        </Link>
                    </div>
                    ,
                    <div className="info__ele">
                        <Link to="/create">
                            <i className="material-icons">add_box</i>
                        </Link>
                    </div>
                    ,
                    <div className="info__ele">
                        <Link to="/myfollowingpost">
                            <i className="material-icons">rss_feed</i>
                        </Link>
                    </div>
                    ,
                    <div className="info__ele d--flex align-items--center">
                        <div className="info__user">
                            <i
                                className="material-icons"
                                onClick={() => {
                                    var x = document.getElementById(
                                        'info__option',
                                    );
                                    if (x.style.display === 'none') {
                                        x.style.display = 'block';
                                    } else {
                                        x.style.display = 'none';
                                    }
                                }}
                            >
                                person
                            </i>
                        </div>
                        <div
                            className="info__option absolute"
                            id="info__option"
                            style={{ display: 'none' }}
                        >
                            <div className="square absolute"></div>
                            <div className="option">
                                <Link to="/profile">
                                    <div className="option__ele">
                                        <div className="option__icon">
                                            <i className="material-icons">
                                                person_outline
                                            </i>
                                        </div>
                                        <div className="option__title">
                                            <span>Hồ sơ</span>
                                        </div>
                                    </div>
                                </Link>
                                <Link
                                    onClick={() => {
                                        localStorage.clear();
                                        dispatch({ type: 'CLEAR' });
                                        history.push('/signin');
                                    }}
                                >
                                    <div className="option__ele">
                                        <div className="option__icon">
                                            <i className="material-icons">
                                                exit_to_app
                                            </i>
                                        </div>
                                        <div className="option__title">
                                            Đăng xuất
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
