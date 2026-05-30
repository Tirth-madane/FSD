// c:\Users\Deepak Chheda\Downloads\DEVANSH SUBMISSION\fsd\4_college_portal_and_feedback\app.js

document.addEventListener('DOMContentLoaded', () => {
  const feedbackForm = document.getElementById('feedback-form');
  const reviewsContainer = document.getElementById('reviews-container');
  const submitBtn = document.getElementById('fb-submit-btn');

  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect Input values
    const name = document.getElementById('fb-name').value.trim();
    const ratingVal = document.getElementById('fb-rating').value;
    const comments = document.getElementById('fb-comments').value.trim();

    if (!name || !comments) return;

    // Simulate AJAX Request using modern fetch and a mock endpoint
    // We will use a mock Promise to simulate a network call to /api/feedback
    // and demonstrate AJAX dynamic update
    
    // Set button state to loading
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="loading-spinner"></span>Submitting...`;

    // Simulate server latency
    setTimeout(() => {
      // 1. Create stars display
      let stars = '';
      for (let i = 0; i < Number(ratingVal); i++) {
        stars += '⭐';
      }

      // 2. Create card element
      const card = document.createElement('div');
      card.className = 'review-card';
      card.innerHTML = `
        <div class="review-header">
          <span class="review-author">${escapeHTML(name)} (Student)</span>
          <span class="review-rating">${stars}</span>
        </div>
        <p class="review-text">${escapeHTML(comments)}</p>
      `;

      // 3. Prepend into container dynamically (No page reload)
      reviewsContainer.insertBefore(card, reviewsContainer.firstChild);

      // 4. Smooth scroll to newest review
      reviewsContainer.scrollTop = 0;

      // 5. Restore button state and reset inputs
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      feedbackForm.reset();

    }, 1200); // 1.2 second simulated server delay
  });

  // Helper to prevent HTML injection XSS
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
});
