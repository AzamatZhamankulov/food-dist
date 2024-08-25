"use strict";
//! Lesson #63 New tabs function to show and hide the content by clicking on item

window.addEventListener('DOMContentLoaded', () => {
    //todo it is tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');


    // function hideTabContent() {
    //     tabsContent.forEach(item => {
    //         item.style.display = 'none';
    //     });

    //     tabs.forEach(item => {
    //         item.classList.remove('tabheader__item_active');
    //     });
    // }

    // function showTabContent(i = 0) {
    //     tabsContent[i].style.display ='block';
    //     tabs[i].classList.add('tabheader__item_active');
    // }

    // hideTabContent();
    // showTabContent();

    // tabsParent.addEventListener('click', (e) => {
    //     const target = e.target;

    //     if (target && target.classList.contains('tabheader__item')) {
    //         tabs.forEach((item, i) => {
    //             if (target == item) {
    //                 hideTabContent();
    //                 showTabContent(i);
    //             }
    //         });
    //     }
    // });

    //todo we have added classes in style.css so we can change functions with new classes

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //todo lesson #68 timer for promotion 

    const deadline = '2024-08-31';

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endtime) - Date.parse(new Date());

        if (t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        };
              
        return {
            'total' : t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
            
        updateClock();
        
        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    };
    
    setClock('.timer', deadline);
    
    //todo lesson #70 Modal window
    //! data-modal and data-close should be writen in html
    
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');
          
    //todo lest creat a fucntion for opening modal window
    function openModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        //to stop showing modal again and again
        clearInterval(modalTimerId);
    };

    //todo lets creat a function for closing modal window because it is repeating
    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    };
    
    //Event to show the modal from all btns
 
    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
    
    //Event to close modal
    modalCloseBtn.addEventListener('click', closeModal);
    
    //todo if we want to close modal window by clicking any where
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    //todo if we want to bind btn esc to closing the modal window
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    
    //! lesson #72 modification of modal window
    //todo to set timeout modal window apear in proper time
    const modalTimerId = setTimeout(openModal, 5000);

    //todo if user scrolled page alldown we have to show modal window
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);





});