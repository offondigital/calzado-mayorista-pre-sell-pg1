// ============================================
// CALZADO MAYORISTA - PRESELL PAGE
// Script otimizado para 99+ PageSpeed
// ============================================

// 🔧 CONFIGURAÇÃO - ALTERE APENAS ESTA LINHA
// Coloque aqui o caminho para sua página de destino
// Exemplos:
// const DESTINO_URL = "destino.html";
// const DESTINO_URL = "https://wa.me/5491112345678";
// const DESTINO_URL = "https://seusite.com/catalogo";
// ============================================
const DESTINO_URL = "destino.html";

// ============================================
// Código otimizado com requestIdleCallback
// ============================================
(function() {
    let redirectTriggered = false;
    let cookiePopupClosed = false;
    
    function redirectToDestination() {
        if (!redirectTriggered) {
            redirectTriggered = true;
            window.location.href = DESTINO_URL;
        }
    }
    
    function closeCookiePopup() {
        if (cookiePopupClosed) return;
        cookiePopupClosed = true;
        const popup = document.getElementById('cookiePopup');
        if (popup) {
            popup.style.animation = 'slideUp 0.2s reverse';
            setTimeout(() => { if(popup) popup.style.display = 'none'; }, 200);
        }
    }
    
    // Eventos com passive e once para máxima performance
    let mouseMoveHandler = () => { closeCookiePopup(); redirectToDestination(); };
    document.addEventListener('mousemove', mouseMoveHandler, { passive: true, once: true });
    
    let scrollHandler = () => { closeCookiePopup(); redirectToDestination(); };
    window.addEventListener('scroll', scrollHandler, { passive: true, once: true });
    
    let touchHandler = () => { closeCookiePopup(); redirectToDestination(); };
    document.addEventListener('touchstart', touchHandler, { passive: true, once: true });
    
    const acceptBtn = document.getElementById('cookieAcceptBtn');
    if(acceptBtn) acceptBtn.addEventListener('click', () => { closeCookiePopup(); redirectToDestination(); });
    
    const closeBtn = document.getElementById('cookieCloseBtn');
    if(closeBtn) closeBtn.addEventListener('click', () => { closeCookiePopup(); redirectToDestination(); });
    
    // Press and Hold (3 segundos)
    function setupPressHold() {
        const btn = document.getElementById('pressHoldBtn');
        const timerDiv = document.getElementById('holdTimer');
        if(!btn) return;
        
        let pressStartTime = 0;
        let animationFrame = null;
        let pressHoldTriggered = false;
        
        const updateTimerDisplay = () => {
            if(!pressStartTime) return;
            const elapsed = (Date.now() - pressStartTime) / 1000;
            const remaining = Math.max(0, 3 - elapsed);
            if(timerDiv) {
                timerDiv.innerText = `⏱️ Soltá después de ${remaining.toFixed(1)} segundos...`;
            }
            if(elapsed >= 3) {
                if(!pressHoldTriggered && !redirectTriggered) {
                    pressHoldTriggered = true;
                    if(timerDiv) timerDiv.innerText = '✅ Redirigiendo...';
                    closeCookiePopup();
                    window.location.href = DESTINO_URL;
                }
                cancelPress();
            } else {
                animationFrame = requestAnimationFrame(updateTimerDisplay);
            }
        };
        
        const startPress = (e) => {
            e.preventDefault();
            if(pressHoldTriggered || redirectTriggered) return;
            pressStartTime = Date.now();
            updateTimerDisplay();
            document.addEventListener('mouseup', cancelPress);
            document.addEventListener('touchend', cancelPress);
        };
        
        const cancelPress = () => {
            if(animationFrame) cancelAnimationFrame(animationFrame);
            pressStartTime = 0;
            if(timerDiv) timerDiv.innerText = '';
            document.removeEventListener('mouseup', cancelPress);
            document.removeEventListener('touchend', cancelPress);
        };
        
        btn.addEventListener('mousedown', startPress);
        btn.addEventListener('touchstart', startPress);
    }
    
    // Botão rápido (1 segundo)
    function setupFastButton() {
        const fastBtn = document.getElementById('presellFastBtn');
        if(!fastBtn) return;
        
        let fastTimer = null;
        let fastTriggered = false;
        
        const startPress = () => {
            if(fastTriggered || redirectTriggered) return;
            fastTimer = setTimeout(() => {
                if(!fastTriggered) {
                    fastTriggered = true;
                    closeCookiePopup();
                    window.location.href = DESTINO_URL;
                }
            }, 1000);
        };
        
        const cancelPress = () => { if(fastTimer) clearTimeout(fastTimer); };
        
        fastBtn.addEventListener('mousedown', startPress);
        fastBtn.addEventListener('mouseup', cancelPress);
        fastBtn.addEventListener('mouseleave', cancelPress);
        fastBtn.addEventListener('touchstart', startPress);
        fastBtn.addEventListener('touchend', cancelPress);
    }
    
    // Executar após o DOM estar pronto usando requestIdleCallback
    if(window.requestIdleCallback) {
        requestIdleCallback(() => { setupPressHold(); setupFastButton(); });
    } else {
        setTimeout(() => { setupPressHold(); setupFastButton(); }, 0);
    }
})();
