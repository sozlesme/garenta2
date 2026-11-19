(() => {
  const STORE = 'rent-a-cars-go-v1';
  const WA_ICON = '<svg class="icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.4 11.8a8.4 8.4 0 0 1-12.4 7.4L4 20l.9-3.8a8.4 8.4 0 1 1 15.5-4.4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.3 7.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.5.6c-.2.2-.2.4-.1.6.4.8 1.1 1.5 1.9 1.9.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5v.5c0 .3-.1.5-.4.7-.5.3-1.2.5-1.9.4-1.1-.2-2.4-.8-3.6-2-1.2-1.2-1.8-2.5-2-3.6-.1-.7.1-1.4.6-2Z" fill="currentColor"/></svg>';
  let installPrompt = null;

  function readState(){return window.rgoStore?.read()||{};}
  function settings(){return readState().settings||{};}
  function saveSettings(next){window.rgoStore.updateSettings(next);}
  function toast(text) {
    let el = document.querySelector('#toast');
    if (!el) { el = document.createElement('div'); el.id = 'toast'; el.className = 'toast'; document.body.append(el); }
    el.textContent = text; el.classList.add('show');
    clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove('show'), 3000);
  }
  function logEvent(type,label){window.rgoStore?.event(type,label);}
  function whatsappDigits() { return String(settings().whatsapp || '').replace(/\D/g, ''); }
  function promoCode() { return settings().appPromoCode || 'UYGULAMADAN%35'; }
  function sendPromo() {
    const s = settings(), code = promoCode(), discount = Number(s.appDiscount) || 35;
    const message = `Merhaba, Rent A Cars Go uygulamasından gelen %${discount} indirim kodumu kullanmak istiyorum. Kod: ${code}`;
    const number = whatsappDigits();
    logEvent('whatsapp', 'Uygulama kampanya kodu');
    if (number) window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(code).then(() => toast(number ? 'Kod kopyalandı, hazır WhatsApp mesajı açıldı.' : 'Kod kopyalandı. WhatsApp numarası yönetim panelinden eklenmeli.')).catch(() => toast(number ? 'Hazır WhatsApp mesajı açıldı.' : 'WhatsApp numarası yönetim panelinden eklenmeli.'));
    else toast(number ? 'Hazır WhatsApp mesajı açıldı.' : 'WhatsApp numarası yönetim panelinden eklenmeli.');
  }
  function closePromo() {
    document.querySelector('#app-promo')?.remove();
    localStorage.setItem('rgo-app-promo-dismissed', '1');
  }
  function showPromo(force = false) {
    const s = settings();
    if (s.appPopupEnabled === false || document.querySelector('#app-promo') || (location.hash === '#admin' || location.pathname.replace(/\/+$/, '') === '/admin')) return;
    if (!force && localStorage.getItem('rgo-app-promo-dismissed')) return;
    if (window.matchMedia('(display-mode: standalone)').matches || navigator.standalone) return;
    const code = promoCode(), discount = Number(s.appDiscount) || 35;
    const popup = document.createElement('aside'); popup.id = 'app-promo'; popup.className = 'app-promo';
    popup.innerHTML = `<button class="promo-close" data-pwa-action="close" aria-label="Kapat">×</button><span class="promo-kicker">RENT A CARS GO · UYGULAMA</span><h3>Filo cebinde.<br><span style="color:var(--red)">Yola hazır.</span></h3><p>${escapeHtml(s.appPromoText || 'Uygulamayı indir, uygulamadan gelenlere özel indirim kodunu kullan.')}</p><div class="promo-code"><div><span>UYGULAMA KAMPANYA KODU</span><strong>${escapeHtml(code)}</strong></div><span style="color:#ff858c;font-weight:800">−%${discount}</span></div><button class="btn btn-whatsapp" data-pwa-action="promo">${WA_ICON} Kodu WhatsApp’tan al</button><button class="btn btn-red" style="margin-top:8px" data-pwa-action="install">Uygulamayı indir</button><div class="promo-license"><p>Ehliyet tarihinize ve sınıfınıza göre araç seçeneklerini keşfedin.</p><button class="btn btn-outline" data-pwa-action="license">Ehliyetime uygun araçları gör <span aria-hidden="true">→</span></button></div><div class="promo-note">Kod hazır mesajla WhatsApp’a aktarılır · Gönder tuşu sizde</div>`;
    document.body.append(popup);
  }
  function escapeHtml(text) { return String(text).replace(/[&<>"']/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch])); }
  function install() {
    if (!installPrompt) { toast('Uygulama yükleme, site güvenli HTTPS adresinde yayımlandığında açılır.'); return; }
    installPrompt.prompt();
    installPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') { closePromo(); logEvent('install', 'Uygulama yükleme'); toast('Uygulama yükleniyor.'); }
      installPrompt = null;
    }).catch(() => toast('Yükleme penceresi açılamadı.'));
  }
  function renderAppAdmin() {
    const s = settings(), content = document.querySelector('#admin-content');
    if (!content) return;
    document.querySelectorAll('.admin-nav button').forEach(b => b.classList.remove('active'));
    document.querySelector('[data-pwa-tab]')?.classList.add('active');
    content.innerHTML = `<form id="pwa-settings-form" class="admin-panel"><div class="panel-title"><div><h2>Uygulama indirme popup’ı</h2><p>Kurulabilir web uygulamasını ve uygulamaya özel indirimi yönetin.</p></div><button class="tiny-btn" type="button" data-pwa-action="preview">Popup önizle</button></div><label class="check-row"><input name="appPopupEnabled" type="checkbox" ${s.appPopupEnabled === false ? '' : 'checked'}> Ziyaretçilere uygulama popup’ını göster</label><div class="admin-form" style="margin-top:14px"><div class="admin-field"><label>Kampanya kodu</label><input name="appPromoCode" value="${escapeHtml(promoCode())}"></div><div class="admin-field"><label>İndirim oranı (%)</label><input name="appDiscount" type="number" min="1" max="90" value="${Number(s.appDiscount) || 35}"></div><div class="admin-field full"><label>Popup açıklaması</label><textarea name="appPromoText">${escapeHtml(s.appPromoText || 'Uygulamayı indir, uygulamadan gelenlere özel %35 indirim kodunu kullan.')}</textarea></div></div><div class="notice" style="margin-top:14px">“Kodu WhatsApp’tan al” düğmesi kodu kopyalar ve WhatsApp numaranıza indirim kodu yazılmış mesajı açar. Ziyaretçi mesajı WhatsApp’ta gönderir.</div><div style="display:flex;justify-content:flex-end;margin-top:15px"><button class="btn btn-red">Kampanyayı kaydet</button></div></form><div class="admin-panel"><div class="panel-title"><div><h2>Uygulama durumu</h2><p>Site PWA olarak kurulabilir şekilde hazırlandı.</p></div></div><div class="channel-row"><span>Popup</span><b>${s.appPopupEnabled === false ? 'Kapalı' : 'Açık'}</b></div><div class="channel-row"><span>Kampanya</span><b>${escapeHtml(promoCode())} · %${Number(s.appDiscount) || 35}</b></div><div class="notice">Yükleme isteği HTTPS alan adında etkinleşir. Bu dosya bilgisayarda doğrudan açıldığında tarayıcı uygulama kurulum penceresini göstermez.</div></div>`;
  }
  function injectExtendedSettings() {
    const s = settings();
    const contactForm = document.querySelector('form[data-form="contacts"]');
    const contactGrid = contactForm?.querySelector('.admin-form');
    if (contactGrid && !contactGrid.querySelector('[name="callLabel"]')) {
      contactGrid.insertAdjacentHTML('beforeend', `<div class="admin-field"><label>Arama düğmesi yazısı</label><input name="callLabel" value="${escapeHtml(s.callLabel || 'Ara')}"></div><div class="admin-field"><label>WhatsApp düğmesi yazısı</label><input name="whatsappLabel" value="${escapeHtml(s.whatsappLabel || 'WhatsApp')}"></div><label class="check-row"><input name="mobileDock" type="checkbox" ${s.mobileDock === false ? '' : 'checked'}> Mobil sabit arama / WhatsApp çubuğunu göster</label>`);
    }
    const marketingForm = document.querySelector('form[data-form="marketing"]');
    const marketingGrid = marketingForm?.querySelector('.admin-form');
    if (marketingGrid && !marketingGrid.querySelector('[name="googleAdsLabel"]')) {
      const ads = marketingGrid.querySelector('[name="googleAds"]')?.closest('.admin-field');
      ads?.insertAdjacentHTML('afterend', `<div class="admin-field"><label>Google Ads dönüşüm etiketi</label><input name="googleAdsLabel" value="${escapeHtml(s.googleAdsLabel || '')}" placeholder="Dönüşüm etiketi"></div>`);
    }
  }
  function injectAdminTab() {
    injectExtendedSettings();
    const nav = document.querySelector('.admin-nav');
    if (!nav || nav.querySelector('[data-pwa-tab]')) return;
    const button = document.createElement('button'); button.dataset.pwaTab = '1'; button.innerHTML = '<span style="width:16px;color:var(--red);font-size:14px">⌂</span>Uygulama ve kampanya';
    const separator = document.createElement('div'); separator.className = 'nav-sep';
    const siteButton = nav.querySelector('[data-action="public"]');
    if (siteButton) { nav.insertBefore(separator, siteButton); nav.insertBefore(button, separator); }
    else nav.append(button);
  }
  document.addEventListener('click', e => {
    const action = e.target.closest('[data-pwa-action]')?.dataset.pwaAction;
    if (action === 'close') closePromo();
    if (action === 'license') { closePromo(); document.dispatchEvent(new CustomEvent('rgo:open-license')); }
    if (action === 'promo') sendPromo();
    if (action === 'install') install();
    if (action === 'preview') showPromo(true);
    if (e.target.closest('[data-pwa-tab]')) renderAppAdmin();
    if (e.target.closest('.admin-nav [data-tab]')) document.querySelector('[data-pwa-tab]')?.classList.remove('active');
    if (e.target.closest('[data-action="open-app"]')) showPromo(true);
  });
  document.addEventListener('submit', e => {
    const form = e.target.closest('#pwa-settings-form'); if (!form) return;
    e.preventDefault(); e.stopImmediatePropagation();
    const fd = new FormData(form);
    saveSettings({ appPopupEnabled:fd.get('appPopupEnabled') === 'on', appPromoCode:String(fd.get('appPromoCode') || 'UYGULAMADAN%35').trim(), appDiscount:Math.min(90,Math.max(1,Number(fd.get('appDiscount')) || 35)), appPromoText:String(fd.get('appPromoText') || '').trim() });
    closePromo(); toast('Uygulama ve kampanya ayarları kaydedildi.'); location.reload();
  }, true);
  window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; });
  window.addEventListener('appinstalled', () => { closePromo(); logEvent('install','Uygulama yüklendi'); toast('Rent A Cars Go uygulaması yüklendi.'); });
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('./sw.js?v=16').catch(() => {});
  const observer = new MutationObserver(() => injectAdminTab()); observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(() => showPromo(),7200);
  setTimeout(() => {
    const links=document.querySelector('.site-footer .footer-links');
    if(links&&!links.querySelector('[data-action="open-app"]')){const b=document.createElement('button');b.className='install-ribbon';b.dataset.action='open-app';b.textContent='Uygulamayı indir';links.prepend(b);}
  },500);
})();
