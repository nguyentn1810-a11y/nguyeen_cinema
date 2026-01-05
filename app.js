// --- 1. Logic chuyển đổi Form Đăng ký/Đăng nhập ---

const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const showSignUpLink = document.getElementById('showSignUp');
const showSignInLink = document.getElementById('showSignIn');

showSignUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    signInForm.classList.add('hidden');
    signUpForm.classList.remove('hidden');
});

showSignInLink.addEventListener('click', (e) => {
    e.preventDefault();
    signUpForm.classList.add('hidden');
    signInForm.classList.remove('hidden');
});

// --- 2. Xử lý lưu trữ với localStorage ---

// Hàm lấy danh sách người dùng từ localStorage
const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
};

// Xử lý ĐĂNG KÝ
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username_up').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password_up').value; // Giả định bạn có field này

    if (!email.includes('@')) {
        alert("Email phải có ký tự @");
        return;
    }

    const users = getUsers();

    // Kiểm tra xem username đã tồn tại chưa
    const userExists = users.find(u => u.username === username);

    if (userExists) {
        alert("Tên đăng nhập đã tồn tại!");
    } else {
        // Lưu người dùng mới vào mảng
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        
        alert(`Đăng ký thành công! Tài khoản: ${username} đã được tạo!`);
        // Chuyển về form đăng nhập sau khi đăng ký xong
        showSignInLink.click();
    }
});

// Xử lý ĐĂNG NHẬP
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username_in').value;
    const password = document.getElementById('password_in').value; // Giả định bạn có field này

    const users = getUsers();

    // Tìm người dùng trong localStorage
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert(`Đăng nhập thành công! Chào mừng, ${username}!`);
        // Bạn có thể lưu trạng thái đăng nhập hiện tại nếu muốn
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
});