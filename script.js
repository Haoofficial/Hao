// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动导航
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const navHeight = document.querySelector('.navbar').offsetHeight;
            
            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    });

    // 图片上传功能
    const uploadArea = document.querySelector('.upload-area');
    const galleryGrid = document.querySelector('.gallery-grid');
    
    uploadArea.addEventListener('click', function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.multiple = true;
        
        fileInput.addEventListener('change', function(e) {
            const files = e.target.files;
            handleImageUpload(files);
        });
        
        fileInput.click();
    });

    // 拖拽上传功能
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#3498db';
        this.style.background = '#d6eaf8';
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.style.borderColor = '#bdc3c7';
        this.style.background = '#ecf0f1';
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#bdc3c7';
        this.style.background = '#ecf0f1';
        
        const files = e.dataTransfer.files;
        handleImageUpload(files);
    });

    function handleImageUpload(files) {
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    createImageCard(e.target.result, file.name);
                };
                
                reader.readAsDataURL(file);
            }
        }
    }

    function createImageCard(imageData, fileName) {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        imageCard.style.background = 'white';
        imageCard.style.borderRadius = '10px';
        imageCard.style.padding = '1rem';
        imageCard.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        
        imageCard.innerHTML = `
            <img src="${imageData}" alt="${fileName}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 5px;">
            <p style="margin-top: 0.5rem; color: #666; font-size: 0.9rem;">${fileName}</p>
        `;
        
        galleryGrid.insertBefore(imageCard, uploadArea);
    }

    // 博客发布功能
    const blogPosts = document.querySelector('.blog-posts');
    const postTextarea = document.querySelector('.new-post textarea');
    const postButton = document.querySelector('.new-post .btn');

    postButton.addEventListener('click', function() {
        const content = postTextarea.value.trim();
        if (content) {
            createBlogPost(content);
            postTextarea.value = '';
        }
    });

    function createBlogPost(content) {
        const now = new Date();
        const dateString = now.toLocaleDateString('zh-CN') + ' ' + now.toLocaleTimeString('zh-CN', {hour: '2-digit', minute:'2-digit'});
        
        const blogPost = document.createElement('article');
        blogPost.className = 'blog-post';
        
        blogPost.innerHTML = `
            <h3>新的随笔</h3>
            <p class="post-date">${dateString}</p>
            <p>${content.replace(/\n/g, '<br>')}</p>
        `;
        
        blogPosts.insertBefore(blogPost, blogPosts.firstChild);
    }

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        } else {
            navbar.style.background = '#2c3e50';
        }
    });
});
