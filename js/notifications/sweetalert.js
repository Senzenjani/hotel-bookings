export function notify(position, icon, title, text, showButton, timer) {
    Swal.fire({
        position: position,
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: showButton,
        timer: timer
    });
}