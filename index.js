const posts = [
    {
        name: "Vincent van Gogh",
        username: "vincey1853",
        location: "Zundert, Netherlands",
        avatar: "/images/avatar-vangogh.jpg",
        post: "/images/post-vangogh.jpg",
        comment: "just took a few mushrooms lol",
        likes: 21
    },
    {
        name: "Gustave Courbet",
        username: "gus1819",
        location: "Ornans, France",
        avatar: "/images/avatar-courbet.jpg",
        post: "/images/post-courbet.jpg",
        comment: "i'm feelin a bit stressed tbh",
        likes: 4
    },
    {
        name: "Joseph Ducreux",
        username: "jd1735",
        location: "Paris, France",
        avatar: "/images/avatar-ducreux.jpg",
        post: "/images/post-ducreux.jpg",
        comment: "gm friends! which coin are YOU stacking up today?? post below and WAGMI!",
        likes: 152
    }
];

// SVG icons for heart, comment, dm
const icons = {
    heart: `<svg class="post-icon" tabindex="0" aria-label="Like" viewBox="0 0 24 24" fill="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#222"/></svg>`,
    comment: `<svg class="post-icon" tabindex="0" aria-label="Comment" viewBox="0 0 24 24" fill="none"><path d="M21 6.5a2.5 2.5 0 0 0-2.5-2.5h-13A2.5 2.5 0 0 0 3 6.5v9A2.5 2.5 0 0 0 5.5 18H7v3l4-3h7.5A2.5 2.5 0 0 0 21 15.5v-9z" fill="#222"/></svg>`,
    dm: `<svg class="post-icon" tabindex="0" aria-label="Direct Message" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="#222" stroke-width="2"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#222" stroke-width="2"/></svg>`
};

function renderPosts() {
    const feed = document.getElementById('feed');
    feed.innerHTML = posts.map((post, idx) => `
        <article class="post" aria-label="Post by ${post.name}">
            <div class="post-header">
                <img src="${post.avatar}" alt="Avatar of ${post.name}" class="post-avatar" />
                <div class="post-user-info">
                    <strong>${post.name}</strong>
                    <span class="post-location">${post.location}</span>
                </div>
            </div>
            <img src="${post.post}" alt="Post by ${post.name}" class="post-img" data-idx="${idx}" tabindex="0" />
            <div class="post-footer">
                <div class="post-icons">
                    <span class="icon-heart" data-idx="${idx}" tabindex="0" role="button" aria-pressed="false">${icons.heart}</span>
                    <span class="icon-comment" tabindex="0" role="button">${icons.comment}</span>
                    <span class="icon-dm" tabindex="0" role="button">${icons.dm}</span>
                </div>
                <div class="post-likes" id="likes-${idx}">${post.likes} likes</div>
                <div class="post-caption"><strong>${post.username}</strong> ${post.comment}</div>
            </div>
        </article>
    `).join('');
}

function addEventListeners() {
    // Like by double-clicking image or clicking heart
    document.querySelectorAll('.post-img').forEach(img => {
        img.addEventListener('dblclick', () => increaseLikes(img.dataset.idx));
        img.addEventListener('keydown', e => {
            if (e.key === 'Enter') increaseLikes(img.dataset.idx);
        });
    });
    document.querySelectorAll('.icon-heart').forEach(heart => {
        heart.addEventListener('click', () => increaseLikes(heart.dataset.idx));
        heart.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') increaseLikes(heart.dataset.idx);
        });
    });
}

function increaseLikes(idx) {
    posts[idx].likes++;
    document.getElementById(`likes-${idx}`).textContent = `${posts[idx].likes} likes`;
    // Animate heart
    const heart = document.querySelector(`.icon-heart[data-idx="${idx}"] .post-icon`);
    if (heart) {
        heart.style.filter = 'drop-shadow(0 0 6px #e74c3c)';
        setTimeout(() => heart.style.filter = '', 300);
    }
}

function init() {
    renderPosts();
    addEventListeners();
}

document.addEventListener('DOMContentLoaded', init);

