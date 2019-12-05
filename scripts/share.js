let popitup = (rqr_win = {name: 'new Window', url: 'https://example.com'}) => {
    console.log(rqr_win);
    newwindow = window.open(rqr_win.url, rqr_win.name, "height=500,width=700");
    newwindow.focus();
};

document.getElementById('whatsapp-share').addEventListener('click', () => {
    popitup({
        name: 'share on WhatsApp',
        url: 'https://api.whatsapp.com/send?phone&text='+ encodeURIComponent(window.location.href)
    })
});
document.getElementById('facebook-share').addEventListener('click', () => {
    popitup({
        name: 'share on facebook',
        url: 'https://www.facebook.com/sharer/sharer.php?&u='+ encodeURIComponent(window.location.href)
    })
});
// document.getElementById('instagram-share').addEventListener('click', () => {
//     popitup({
//         name: 'share on Instagram',
//         url: 'https://www.facebook.com/sharer/sharer.php?&u='+ encodeURIComponent(window.location.href)
//     })
// })
document.getElementById('twitter-share').addEventListener('click', () => {
    popitup({
        name: 'share on Twitter',
        url: 'https://twitter.com/intent/tweet?text='+ encodeURIComponent(window.location.href)
    })
});
