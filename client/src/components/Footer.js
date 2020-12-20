import React from 'react';

const Footer = () => {
    return (
        <footer class="container footer">
            <div class="info-list d--flex justify-content--center">
                <span class="info-list__item">About</span>
                <span class="info-list__item">BLog</span>
                <span class="info-list__item">Jobs</span>
                <span class="info-list__item">Help</span>
                <span class="info-list__item">API</span>
            </div>
            <div class="info-list d--flex justify-content--center">
                <span class="info-list__item">VietNam</span>
                <span class="info-list__item">
                    © 2020 LiVi from{' '}
                    <a href="https://www.facebook.com/linhku59">Quang Linh</a> &{' '}
                    <a href="https://www.facebook.com/lequocviet99">
                        Quoc Viet
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;
