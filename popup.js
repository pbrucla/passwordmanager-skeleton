
let globalMasterKey = "";

const verifierPlaintext = "success";

document.addEventListener("DOMContentLoaded", () => {
    // Check if account already exists
    chrome.storage.local.get("username", (data) => {
        if (data.username) {
            showLoginScreen();
        } else {
            showSignupScreen();
        }
    });
});


function showSignupScreen() {
    const btn = document.getElementById("signupBtn");
    btn.addEventListener("click", handleSignup);
}


function showLoginScreen() {
    // Swap the signup form for a login form
    document.body.innerHTML = `
        <h2>Welcome Back</h2>
        <input type="password" id="masterPassword" placeholder="Master Password" />
        <button id="loginBtn">Unlock</button>
        <p id="message"></p>
    `;

    document.getElementById("loginBtn").addEventListener("click", handleLogin);
}


function showHomeScreen() {
    document.body.innerHTML = `
        <button id="viewSavedCreds">View Saved Credentials</button>
        <hr>
        <input type="text" id="accountName" placeholder="Site Name" />
        <input type="text" id="username" placeholder="Site Username" />
        <input type="password" id="password" placeholder="Site Password" />
        <button id="addCredBtn">Save Credentials</button>
        <p id="message"></p>
    `;

    document.getElementById("addCredBtn").addEventListener("click", addCredentials);
    document.getElementById("viewSavedCreds").addEventListener("click", viewSavedCredentials);
}


function validateMasterPassword(password) {
    // Check the 8–20 character policy (lowercase, uppercase, number, symbol); return an error or null.
    if (password.length < 8 || password.length > 20) {
        return "Password must be 8-20 characters long."
    }
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter."
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter."
    }
    if (!/[0-9]/.test(password)) {
        return "Password must contain at least one digit."
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
        return "Password must contain at least one symbol (non-alphanumeric)."
    }
    return null
}


async function handleSignup() {
    // Validate inputs, generate a random salt and master key, then store an encrypted verifier and signup data.
    // Works with generateKey() and encryptVerifier()
}


async function generateKey(masterPassword, salt) {
    // Use PBKDF2 with SHA-256, the provided salt, and 100,000 iterations to derive a 256-bit AES-GCM key.
}


async function encryptVerifier(masterKey, verifierIV) {
    // AES-GCM encrypt verifierPlaintext with masterKey and verifierIV, then return the ciphertext as an array.
}


async function handleLogin() {
    // Retrieve the saved salt and verifier, derive the attempted key, verify the password, and unlock the vault.
}


async function addCredentials() {
    // Read and validate the form, encrypt the username and password, and save the credential to the vault.
}


async function encryptCredentials(accountUsername, accountPassword) {
    // AES-GCM encrypt the username and password with separate fresh IVs; return ciphertexts and IVs as arrays.
}


async function decryptCredentials(cred) {
    // Decrypt each saved field using its IV and globalMasterKey, then decode and return both strings.
}


async function viewSavedCredentials() {
    // Load the saved vault, decrypt each credential, and display the results using formatCredential().
}


function formatCredential(account, username, password) {
    const cred = document.createElement("div");

    const accountDiv = document.createElement("b");
    accountDiv.textContent = account;
    cred.appendChild(accountDiv);

    const usernameDiv = document.createElement("div");
    usernameDiv.textContent = "Username: " + username;
    cred.appendChild(usernameDiv);

    const passwordDiv = document.createElement("div");
    passwordDiv.textContent = "Password: " + "*".repeat(password.length);

    const button = document.createElement("button");
    button.textContent = "Show";

    let show = false;

    button.addEventListener("click", () => {
        show = !show;

        passwordDiv.textContent = show
            ? "Password: " + password
            : "Password: " + "*".repeat(password.length);

        button.textContent = show ? "Hide" : "Show";
    });

    const passwordRow = document.createElement("div");
    passwordRow.append(passwordDiv, " ", button);
    cred.appendChild(passwordRow);

    cred.appendChild(document.createElement("hr"));

    return cred;
}
