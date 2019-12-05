let popitup = (rqr_win = {name: 'new Window', url: 'https://example.com'}) => {
    console.log(rqr_win);
    newwindow = window.open(rqr_win.url, rqr_win.name, `height=500,width=300`);
    newwindow.focus();
};

document.getElementById('fb-share').addEventListener('click', () => {
    popitup({
        name: 'share on facebook',
        url: 'https://www.facebook.com/sharer/sharer.php?&u='+ encodeURIComponent(window.location.href);
    })
})