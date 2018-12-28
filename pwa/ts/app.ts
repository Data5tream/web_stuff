// Register ServiceWorker
if('serviceWorker' in navigator) navigator.serviceWorker.register('/web_stuff/pwa/dist/js/sw.min.js');

var button = document.getElementById('notification');
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            let nottitle: string = 'Notification';
            let notbody: string = 'Test notification';
            let noticon: string = '/web_stuff/pwa/dist/img/logo.png';
            let options = {
                body: notbody,
                icon: noticon
            }
            let notification: Notification = new Notification(nottitle, options);
        }
    });
});