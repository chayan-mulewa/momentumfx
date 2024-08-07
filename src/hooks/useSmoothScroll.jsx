import { useEffect } from 'react';
import { validateAndSetDefault } from '../utils/index';

const useSmoothScroll = () => {

    const smoothScroll = (momentum, touchMomentum, speed) => {

        momentum = validateAndSetDefault(momentum, 0.01, 1, 0.04, 'Smooth Scroll');
        touchMomentum = validateAndSetDefault(touchMomentum, 0.01, 1, 0.02, 'Touch Momentum');
        speed = validateAndSetDefault(speed, 1, 10, 1, 'Speed');

        useEffect(() => {

            let currentScrollY = window.scrollY;
            let targetScrollY = currentScrollY;
            let touchStartY = 0;
            let rafId = null;

            const smoothScroll = (isTouch = false) => {
                const currentMomentum = isTouch ? touchMomentum : momentum;
                currentScrollY += (targetScrollY - currentScrollY) * currentMomentum;
                window.scrollTo(0, Math.round(currentScrollY));

                if (Math.abs(targetScrollY - currentScrollY) > currentMomentum) {
                    rafId = requestAnimationFrame(() => smoothScroll(isTouch));
                } else {
                    rafId = null;
                }
            };

            const onScroll = (e) => {
                e.preventDefault();
                const deltaY = window.scrollY - currentScrollY;
                targetScrollY += deltaY;
                targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));

                if (!rafId) {
                    // currentScrollY = window.scrollY;
                    // targetScrollY = window.scrollY;
                    smoothScroll();
                }
            };

            const onWheel = (e) => {
                e.preventDefault();
                targetScrollY += e.deltaY * speed;
                targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));

                if (!rafId) {
                    smoothScroll();
                }
            };

            const onTouchMove = (e) => {
                e.preventDefault();
                const deltaY = touchStartY - e.touches[0].clientY;
                targetScrollY += deltaY * speed;
                targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));

                if (!rafId) {
                    smoothScroll(true);
                }
                touchStartY = e.touches[0].clientY;
            };

            const onTouchStart = (e) => {
                touchStartY = e.touches[0].clientY;
            };

            // Add event listeners only once
            if (!rafId) {
                window.addEventListener("scroll", onScroll, { passive: false });
                window.addEventListener("wheel", onWheel, { passive: false });
                window.addEventListener("touchstart", onTouchStart, { passive: false });
                window.addEventListener("touchmove", onTouchMove, { passive: false });
            }

            // Cleanup function
            return () => {
                window.removeEventListener("scroll", onScroll);
                window.removeEventListener("wheel", onWheel);
                window.removeEventListener("touchstart", onTouchStart);
                window.removeEventListener("touchmove", onTouchMove);
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
            };

        }, [momentum, touchMomentum, speed]);
    };

    return [smoothScroll];
};

export default useSmoothScroll;
