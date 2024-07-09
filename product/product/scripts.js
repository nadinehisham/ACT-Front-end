
document.addEventListener('DOMContentLoaded', function() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const productId = button.closest('.box').id;
            const url = `product_details.html?id=${productId}`;
            window.location.href = url;
        });
    });
    function renderCart() {
        $('#cart-items').empty();
        cart.forEach((item, index) => {
            $('#cart-items').append(`
                <tr data-index="${index}">
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>
                        <button class="btn btn-sm btn-danger decrease-qty">-</button>
                        ${item.quantity}
                        <button class="btn btn-sm btn-success increase-qty">+</button>
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td><button class="btn btn-sm btn-danger remove-item">Remove</button></td>
                </tr>
            `);
        });
    }

    // Add item to cart (for demonstration, normally this would be more complex)
    function addItem(name, price) {
        
        let item = cart.find(i => i.name === name);
        if (item) {
            item.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }
    $(document).ready(function() {
        let cart = [];
    
        
    
        // Event delegation for dynamic elements
        $('#cart-items').on('click', '.remove-item', function() {
            const index = $(this).closest('tr').data('index');
            cart.splice(index, 1);
            renderCart();
        });
    
        $('#cart-items').on('click', '.increase-qty', function() {
            const index = $(this).closest('tr').data('index');
            cart[index].quantity += 1;
            renderCart();
        });
    
        $('#cart-items').on('click', '.decrease-qty', function() {
            const index = $(this).closest('tr').data('index');
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            renderCart();
        });
    
        // Checkout button
        $('#checkout-button').click(function() {
            if (cart.length === 0) {
                alert("Your cart is empty!");
            } else {
                // Perform checkout logic (e.g., navigate to a checkout page)
                alert("Proceeding to checkout...");
            }
        });
    
        // For demonstration purposes, adding items to cart
        addItem("Product 1", 10);
        addItem("Product 2", 20);
        addItem("Product 3", 30);
    });
    
   
    document.addEventListener('DOMContentLoaded', function() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const productId = this.dataset.id;
                addToCart(productId);
            });
        });
    
        function addToCart(productId) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const productData = {
                product1: { name: 'VOWNER Coffee Table', price: 6700 },
                product2: { name: 'Product 2', price: 120 },
                product3: { name: 'Panasonic 4K TV', price: 1000 },
                product4: { name: 'Xiaomi Camera', price: 1090 },
                // Add other products here
            };
    
            if (productData[productId]) {
                let item = cart.find(i => i.id === productId);
                if (item) {
                    item.quantity += 1;
                } else {
                    cart.push({ id: productId, ...productData[productId], quantity: 1 });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
                alert('Item added to cart!');
            }
            renderCart()
        }
    });
    
});

/*----------------------------------------------------------------------------------------------LOGIN---------------------------------------------------------------------------------*/
$(document).ready(function() {
    function getUsersFromLocalStorage() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    function saveUsersToLocalStorage(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    $("#signupForm").on("submit", function(event) {
        event.preventDefault();
        const email = $("#signupEmail").val();
        const username = $("#signupUsername").val();
        const password = $("#signupPassword").val();
        const confirmPassword = $("#confirmPassword").val();
        const users = getUsersFromLocalStorage();

        if (password !== confirmPassword) {
            $("#signupError").text("Passwords do not match.");
            return;
        }

        if (users.find(u => u.username === username)) {
            $("#signupError").text("Username already exists.");
        } else {
            users.push({ email, username, password });
            saveUsersToLocalStorage(users);
            $("#signupError").text("Signup successful!");
            window.location.href = "product.html";

        }
    });

    $("#loginForm").on("submit", function(event) {
        event.preventDefault();
        const username = $("#loginUsername").val();
        const password = $("#loginPassword").val();
        const users = getUsersFromLocalStorage();
        const user = users.find(u => u.username === username);
    
        if (user) {
            if (user.password === password) {
                window.location.href = "product.html";
            } else {
                $("#loginError").text("Invalid username or password.");
            }
        } else {
            $("#loginError").text("No user exists with that username.");
        }
    });
    
    // Helper functions to handle localStorage
    function getUsersFromLocalStorage() {
        return JSON.parse(localStorage.getItem("users")) || [];
    }
    
    function saveUsersToLocalStorage(users) {
        localStorage.setItem("users", JSON.stringify(users));
    }
    
});


