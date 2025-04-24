document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // 부드러운 스크롤 기능 개선
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"], .smooth-scroll');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 외부 링크인 경우 스크롤 처리하지 않음
            if (!targetId || targetId.charAt(0) !== '#') {
                return;
            }
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 스크롤 애니메이션 개선
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - headerHeight - 20;
                
                // 스무스 스크롤 애니메이션
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴가 열려있을 경우 닫기
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
                
                // URL 해시 업데이트 (스크롤 완료 후)
                setTimeout(() => {
                    history.pushState(null, null, targetId);
                }, 1000);
            }
        });
    });
    
    // 스크롤 시 헤더 스타일 변경
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 프로그램 카드에 마우스 호버 효과
    const programCards = document.querySelectorAll('.program-card');
    
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // 전화번호 입력 필드 형식 지정
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            
            if (value.length > 3 && value.length <= 7) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else if (value.length > 7) {
                value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
            }
            
            e.target.value = value;
        });
    }
    
    // 문의 폼 제출 처리
    const contactForm = document.getElementById('inquiry-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const formObj = {};
            
            formData.forEach((value, key) => {
                formObj[key] = value;
            });
            
            // 로딩 상태 표시
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;
            
            // 간단한 시뮬레이션 (실제로는 서버 요청 필요)
            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // 성공 메시지 표시
                alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.');
                contactForm.reset();
                
                // 성공 메시지 표시 (알림창 대신 페이지에 표시하는 방법)
                // const successMessage = document.createElement('div');
                // successMessage.className = 'success-message';
                // successMessage.textContent = '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.';
                // contactForm.insertAdjacentElement('beforebegin', successMessage);
                
                // setTimeout(() => {
                //     successMessage.remove();
                // }, 5000);
            }, 1500);
        });
    }
    
    // 지도 클릭 이벤트
    const mapElement = document.querySelector('.map');
    if (mapElement) {
        mapElement.addEventListener('click', function() {
            // 클릭 애니메이션 효과
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 200);
        });
    }
    
    // 페이지 로드 시 섹션별 애니메이션 효과
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // 맨 위로 버튼 제어
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 스무스 스크롤 애니메이션
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 스크롤 시 현재 섹션 메뉴 활성화
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function highlightNavigation() {
        let scrollPosition = window.scrollY + window.innerHeight / 2;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // 페이지 로드 시 실행
    
    // 페이지 로드 시 해시가 있으면 해당 섹션으로 스크롤
    if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            setTimeout(() => {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - headerHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }

    // 페이지 로딩 문제 해결
    document.body.style.opacity = "1";
    document.body.style.visibility = "visible";
    
    // 기존 애니메이션 교체
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = "1";
        section.style.transform = "translateY(0)";
        // 기존에 observer가 있었다면 제거
        if (window.sectionObserver) {
            window.sectionObserver.unobserve(section);
        }
    });
});

// 페이지 완전 로드 후 실행
window.addEventListener('load', function() {
    // 모든 요소 표시 확인
    document.querySelectorAll('section, .container, .content').forEach(el => {
        el.style.opacity = "1";
        el.style.visibility = "visible";
        el.style.display = "block";
    });
});

// 후기 작성 버튼 클릭 시 이벤트
const addReviewBtn = document.getElementById('add-review-btn');
if (addReviewBtn) {
    addReviewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // 여기에 후기 작성 기능을 구현하거나 폼으로 이동하는 코드를 넣을 수 있습니다
        // 예: 이메일로 연락하거나 폼으로 연결
        window.location.href = "mailto:zoemindfulness@naver.com?subject=상담후기%20작성&body=상담%20후기를%20작성해%20주셔서%20감사합니다.%0A%0A프로그램:%20%0A상담%20일자:%20%0A후기%20내용:%20%0A%0A";
    });
}
