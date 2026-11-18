# TekBir Otogaz — Kurumsal Web Sitesi

Ankara Sincan'da LPG dönüşümü ve otogaz servisi için hazırlanmış, statik (HTML5 + CSS3 + vanilla JS) kurumsal web sitesi. Build adımı gerektirmez; herhangi bir statik sunucuya olduğu gibi yüklenebilir.

## Sayfalar

| Dosya | Amaç |
| --- | --- |
| `index.html` | Ana sayfa: hero, hizmetler, LPG dönüşümü, neden biz, galeri, S.S.S., iletişim |
| `hakkimizda.html` | Kurumsal yaklaşım, çalışma prensibi, şeffaflık notu |
| `hizmetlerimiz.html` | Altı hizmet başlığının detayları, yol AFR ayarı, 10.000 km bakımı, arıza belirtileri |
| `lpg-donusumu.html` | LPG dönüşümü rehberi: sistem türleri (sıralı/turbo/DI), 5 aşamalı montaj, tank güvenliği, uygunluk |
| `yorumlar.html` | Google Haritalar puanı, müşteri yorumları, referans yaklaşımı ve yorum bırakma adımları |
| `sikca-sorulan-sorular.html` | 18 soruluk akordeon + FAQ yapılandırılmış verisi |
| `iletisim.html` | İletişim bilgileri, harita, WhatsApp randevu formu, ulaşım |
| `hizmet-bolgeleri.html` | Ankara'da hizmet verilen 25 ilçe, Sincan'ın 57 mahallesi ve bölge S.S.S. |
| `kvkk.html` | KVKK aydınlatma metni |
| `gizlilik-politikasi.html` | Gizlilik politikası |
| `cerez-politikasi.html` | Çerez politikası |
| `kullanim-sartlari.html` | Kullanım şartları |
| `404.html` | Bulunamayan sayfa |

## Dosya yapısı

```
assets/
  css/style.css          Tasarım sistemi, bileşenler, responsive
  js/main.js             Menü, scroll animasyonu, galeri + lightbox, SSS, form
  img/
    icons.svg            SVG ikon sprite'ı (<use href="...#i-phone">)
    hero-*.webp          Hero görselinin 900/1400/2000 px sürümleri
    galeri-*.webp        Galeri görselleri (600/1100 px)
    hakkimizda-tekbir-otogaz-atolyesi-*.webp  Hakkımızda bölümü ve sayfa başlığı görseli (800/1200 px)
    atolye-tekbir-otogaz-sincan-900.webp  Atölye fotoğrafı (900×1200)
    lpg-montaj-sistemleri-800.webp       Montaj/motor bölümü görseli (800×600)
    afr-ayari-ariza-tespit-800.webp      AFR ayarı ve arıza tespiti görseli (800×600)
    og-tekbir-otogaz.jpg 1200×630 paylaşım görseli
    favicon.svg, apple-touch-icon.png, icon-192.png, icon-512.png
sitemap.xml · robots.txt · site.webmanifest
```

## Yerel önizleme

SVG sprite ve fontlar için dosyaları bir HTTP sunucusu üzerinden açın (çift tıklayıp `file://` ile açmak bazı tarayıcılarda ikonları göstermez):

```bash
python -m http.server 4173
# http://127.0.0.1:4173/index.html
```

## Yayına almadan önce yapılacaklar

1. **Alan adı:** Sitede varsayılan olarak `https://www.tekbirtogaz.com` kullanılıyor. Gerçek alan adı farklıysa aşağıdaki dosyalarda toplu değiştirin:
   - tüm `*.html` dosyalarında `<link rel="canonical">`, `og:url`, `og:image`, JSON-LD içindeki URL'ler
   - `sitemap.xml`, `robots.txt`
   - `site.webmanifest` (`start_url` kök dizin olduğu için genelde değişmez)
2. **Gerçek fotoğraflar:** Servis binası fotoğrafı gerçek işletme fotoğrafıdır; galerideki diğer görseller temsilidir. Google işletme profilindeki gerçek fotoğraflarla değiştirirken dosya adlarını koruyun veya HTML'deki `src`/`srcset` yollarını güncelleyin. Görselleri WebP olarak, aynı boyutlarda (600/1100 px) kaydetmeniz yeterlidir. Galeri öğelerinde büyük görsel `data-full` niteliğinde tanımlıdır.
3. **İşletme bilgileri:** Telefon `+905059796068`, adres `Ahi Evran Mah. 213. Sk. 06935 Sincan / Ankara`, koordinat `39.9663049, 32.5727663`. Değişiklikte tüm sayfalarda (header, footer, iletişim, JSON-LD) tutarlı tutun.
4. **Çalışma saatleri:** Yalnızca Google işletme kaydındaki **kapanış 20:00** bilgisi gösterilir; açılış ve diğer günler için "telefonla teyit alın" notu vardır. Doğrulanmış tam saat listesi elde edilirse bu notlar ve `AutomotiveBusiness` kaydı güncellenebilir.
5. **Google Maps:** `output=embed` adresi kullanılır, API anahtarı gerekmez. Harita yüklenene kadar gri alan görünür; yükleme engellenirse alan boş kalır, bu yüzden harita üzerinde adres/yol tarifi bağlantısı da bulunur.

## İçerik kuralları (bilinçli tercihler)

- Sitede doğrulanmamış **belge numarası, müşteri sayısı veya tasarruf yüzdesi** kullanılmaz. "Yirmi yılı aşkın tecrübe", TSE belgeli montaj, garanti kapsamı ve taksit gibi ifadeler işletmenin kendi beyanıdır; yayına almadan önce belge ve garanti şartlarının teyit edilmesi gerekir.
- Yakıt ekonomisi anlatılırken "litre bazında tüketim artabilir" ve "garanti verilmez" ifadeleri korunmalıdır.
- Hizmet listesi işletmenin verdiği başlıklara dayanır; her bölümde kapsamın araca göre değiştiği ve teyit gerektiği belirtilir.
- Servis binası fotoğrafı gerçektir; temsili galeri görselleri için etiket ve footer notu yer alır.

## Eski siteden aktarım

Yayından kaldırılacak eski site taranarak bilgi ve görseller bu projeye taşındı. Eski siteye hiçbir sayfada bağlantı veya kaynak atfı verilmez.

**Aktarılanlar**

- LPG sistem türleri (atmosferik sıralı, turbo, direkt enjeksiyon / DI-DPI), Opel–Chevrolet Ecotec notu, manifold nozül ve hat güvenliği
- Beş aşamalı montaj süreci: ön kontrol/OBD → sistem seçimi → montaj → kaçak testi → yol testi ve evrak
- Yol AFR (geniş bant lambda) ayarı, 10.000 km filtre ve bakım kapsamı, yaygın arıza belirtileri
- Tank-valf güvenliği (çoklu emniyet valfi, koruyucu kılıflı hat), 8 ek S.S.S. maddesi
- Ankara'da 25 ilçe ve Sincan'ın 57 mahallesi → `hizmet-bolgeleri.html`
- KVKK, gizlilik, çerez ve kullanım şartları sayfaları; footer ve mobil menüden erişilir
- Atölye ve uygulama fotoğrafları: `atolye-tekbir-otogaz-sincan-900.webp`, `lpg-montaj-sistemleri-800.webp`, `afr-ayari-ariza-tespit-800.webp`

**Aktarılmayanlar (bilinçli)**

- Eski sitedeki İvedik OSB / Ostim adresi: yeni sitede doğrulanmış Sincan adresi kullanılıyor, iki adres birlikte gösterilemez.
- Eski sitedeki 08:30–19:00 saatleri: Google işletme kaydındaki 20:00 kapanışı ile çelişiyor; sitede yalnızca kapanış saati ve "telefonla teyit" notu var.
- "%40–45 tasarruf" iddiası: mevcut temkinli metinle çeliştiği için taşınmadı.
- Sabit marka listesi yerine motor tipine göre değerlendirme anlatımı tercih edildi.

## Randevu formu

`iletisim.html` içindeki form **sunucuya veri göndermez**. Ad, araç ve hizmet bilgisinden bir WhatsApp mesajı oluşturup `https://wa.me/905059796068` adresini açar; gönderimi kullanıcı WhatsApp'ta onaylar. Bu nedenle sahte "başarıyla gönderildi" mesajı yoktur. Formu gerçek bir e-posta/CRM entegrasyonuna bağlarsanız `assets/js/main.js` içindeki `[data-wa-form]` bloğunu değiştirin ve sunucu tarafı doğrulama ekleyin.

## Google yorumları sayfası

`yorumlar.html`, işletmenin Google Haritalar kaydındaki herkese açık verileri kullanır: **4,8 puan / 129 değerlendirme** ve müşteri yorumlarından kısaltılmış alıntılar.

- Puan ve yorum sayısı elle yazılmıştır (`.rating__value` ve `.rating__meta`). Google işletme profilindeki değer değiştiğinde bu iki alanı güncelleyin; sayfada "zamanla değişebilir" notu bulunur.
- Yorum kartları `blockquote.review-card` bloklarıdır. Yeni yorum eklerken ad, tarih ve metni Google'daki hâliyle alın; cümleyi yarım bırakmayın, olumsuz yorumları veya işletme yanıtlarını siteye taşımayın.
- Sayfa bilinçli olarak `aggregateRating` yapılandırılmış verisi içermez: Google, işletmenin kendi sitesindeki öz değerlendirmeleri zengin sonuç olarak göstermez.
- "Tüm Yorumları Oku" ve "Google'da Yorum Yaz" butonları doğrudan Google Haritalar yorum sekmesine gider; harici JS veya API anahtarı gerekmez.

## SEO ve erişilebilirlik

- Her sayfada özgün `title`, `description`, canonical, Open Graph ve Twitter kartı.
- Sayfa başına tek `H1`, ardından `H2/H3` hiyerarşisi.
- `AutomotiveBusiness` (adres, telefon, koordinat, hizmet kataloğu), `WebSite`, `BreadcrumbList`, `Service`, `FAQPage` ve `ContactPage` JSON-LD.
- `sitemap.xml`, `robots.txt`, `site.webmanifest`, `lang="tr"`.
- Tüm görsellerde açıklayıcı `alt`, `width/height`, lazy loading; hero görseli `fetchpriority="high"` ve preload.
- Klavye ile kullanılabilir menü, akordeon ve lightbox; `Esc`, ok tuşları, odak geri dönüşü; `prefers-reduced-motion` desteği.
- JavaScript kapalıyken scroll animasyonu devre dışı kalır, içerik görünür kalır (`.js` sınıfı ile).

## Notlar

- Hiçbir harici JS kütüphanesi yoktur; tek harici bağımlılık Google Fonts (Inter) ve Google Maps embed'dir.
- Tüm telefon/WhatsApp/yol tarifi bağlantıları gerçek adreslere gider.
- `assets/img` toplamı ~3 MB'tır; sayfa başına yalnızca görünen görseller yüklenir (lazy loading).
