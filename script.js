document.addEventListener('DOMContentLoaded', function() {
    // 히어로 슬라이드쇼 기능
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    if (slides.length > 1) {
        function showSlide(index, direction = 'next') {
            // 이전 슬라이드 찾기
            const prevIndex = currentSlide;
            
            // 모든 슬라이드의 클래스 제거
            slides.forEach(slide => {
                slide.classList.remove('active', 'slide-in-right', 'slide-in-left', 'slide-out-right', 'slide-out-left');
            });
            
            // 현재 슬라이드와 이전 슬라이드 설정
            if (direction === 'next') {
                // 이전 슬라이드가 있을 때만 애니메이션 적용
                if (prevIndex !== index) {
                    slides[prevIndex].classList.add('slide-out-left');
                }
                slides[index].classList.add('slide-in-right', 'active');
            } else {
                // 이전 슬라이드가 있을 때만 애니메이션 적용
                if (prevIndex !== index) {
                    slides[prevIndex].classList.add('slide-out-right');
                }
                slides[index].classList.add('slide-in-left', 'active');
            }
        }
        
        function nextSlide() {
            const newSlide = (currentSlide + 1) % slides.length;
            showSlide(newSlide, 'next');
            currentSlide = newSlide;
        }
        
        // 초기 슬라이드 설정
        slides[0].classList.add('active');
        slides[0].style.opacity = '1';
        slides[0].style.transform = 'translateX(0)';
        
        // 4초마다 슬라이드 전환
        setInterval(nextSlide, 4000);
    }

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
    
    // 스크롤 시 헤더 스타일 변경 - 성능 최적화
    const header = document.querySelector('header');
    let isScrolled = false;
    let ticking = false;
    
    function updateHeader() {
        if (window.scrollY > 50) {
            if (!isScrolled) {
                header.classList.add('scrolled');
                isScrolled = true;
            }
        } else {
            if (isScrolled) {
                header.classList.remove('scrolled');
                isScrolled = false;
            }
        }
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
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
    
    // 프로그램 관련 페이지에서는 항상 메뉴 열기
    const currentPath = window.location.pathname;
    const programAccordion = document.querySelector('.accordion');
    
    if (programAccordion) {
        // 프로그램 관련 페이지 확인
        const isProgramPage = currentPath.includes('programs') || 
                             currentPath.includes('individual') || 
                             currentPath.includes('video') || 
                             currentPath.includes('couple') || 
                             currentPath.includes('tci') || 
                             currentPath.includes('career') || 
                             currentPath.includes('coaching');
        
        if (isProgramPage) {
            // 프로그램 관련 페이지에서는 항상 메뉴 표시
            programAccordion.classList.add('always-open');
        } else {
            // 다른 페이지에서는 저장된 상태 확인
            const savedAccordionState = localStorage.getItem('accordionOpen');
            if (savedAccordionState === 'true') {
                programAccordion.classList.add('active');
            }
        }
    }

    // 아코디언 메뉴 기능 - 호버로 변경
    const accordionItems = document.querySelectorAll('.accordion');
    
    accordionItems.forEach(accordion => {
        // 마우스 진입 시 메뉴 열기
        accordion.addEventListener('mouseenter', function() {
            if (!this.classList.contains('always-open')) {
                this.classList.add('active');
            }
        });
        
        // 마우스 떠날 시 메뉴 닫기 (always-open이 아닐 때만)
        accordion.addEventListener('mouseleave', function() {
            if (!this.classList.contains('always-open')) {
                this.classList.remove('active');
            }
        });
    });
    
    // 프로그램 메인 링크는 클릭 시 페이지 이동 허용
    const programMainLink = document.querySelector('.accordion > a');
    if (programMainLink) {
        programMainLink.addEventListener('click', function(e) {
            // 프로그램 페이지로 이동할 때 아코디언 상태 유지
            localStorage.setItem('accordionOpen', 'true');
        });
    }
    
    // 세부 메뉴 링크 클릭 시 상태 유지
    const accordionMenuLinks = document.querySelectorAll('.accordion-menu a');
    accordionMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 세부 메뉴 클릭 시 아코디언 상태 유지
            localStorage.setItem('accordionOpen', 'true');
        });
    });

    // 다른 메뉴 링크 클릭 시 아코디언 닫기
    const otherNavLinks = document.querySelectorAll('nav ul li a:not(.accordion > a):not(.accordion-menu a)');
    otherNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            // 다른 메뉴 클릭 시 아코디언 닫기
            localStorage.setItem('accordionOpen', 'false');
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
    const animationSections = document.querySelectorAll('section');
    
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
    
    animationSections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    // 맨 위로 버튼 제어 - 기존 최적화된 스크롤 이벤트에 통합
    const backToTopButton = document.querySelector('.back-to-top');
    let isBackToTopVisible = false;
    
    // 중복 함수 제거 (updateAllScrollEffects로 통합됨)
    
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 스크롤 시 현재 섹션 메뉴 활성화
    const menuSections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    function highlightNavigation() {
        let scrollPosition = window.scrollY + window.innerHeight / 2;
        
        menuSections.forEach(section => {
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
    
    // 기존 updateHeaderAndButton 함수를 확장하여 네비게이션 하이라이트도 포함
    function updateAllScrollEffects() {
        const scrollY = window.scrollY;
        
        // 헤더 스타일 제어
        if (scrollY > 50) {
            if (!isScrolled) {
                header.classList.add('scrolled');
                isScrolled = true;
            }
        } else {
            if (isScrolled) {
                header.classList.remove('scrolled');
                isScrolled = false;
            }
        }
        
        // 맨 위로 버튼 제어
        if (backToTopButton) {
            if (scrollY > 300) {
                if (!isBackToTopVisible) {
                    backToTopButton.classList.add('visible');
                    isBackToTopVisible = true;
                }
            } else {
                if (isBackToTopVisible) {
                    backToTopButton.classList.remove('visible');
                    isBackToTopVisible = false;
                }
            }
        }
        
        // 네비게이션 하이라이트
        highlightNavigation();
        
        ticking = false;
    }
    
    // requestScrollUpdate 함수 업데이트
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateAllScrollEffects);
            ticking = true;
        }
    }
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
    const styleSections = document.querySelectorAll('section');
    styleSections.forEach(section => {
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
