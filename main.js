let reviews = {};
function saveHandler(event){
  const cardContent = event.target.closest('.cardContent');
  const cardId = cardContent.id;
  const reviewText = cardContent.querySelector('.review').value;
  reviews[cardId] = reviewText;
  localStorage.setItem('reviews', JSON.stringify(reviews));
}
function removeHandler(event) {
  const cardContent = event.target.closest('.cardContent');
  const cardId = cardContent.id;
  delete reviews[cardId];
  localStorage.setItem('reviews', JSON.stringify(reviews));
  cardContent.querySelector('.review').value = '';
}
function init(){
  const storedReviews = localStorage.getItem('reviews');
  if(storedReviews) {
    reviews = JSON.parse(storedReviews);
    for (const cardId in reviews) {
      const reviewText = reviews[cardId];
      document.getElementById(cardId).querySelector('.review').value = reviewText;
    }
  }
  document.querySelectorAll('.save').forEach(saveBtn => {
    saveBtn.addEventListener('click', saveHandler);
  });
  document.querySelectorAll('.remove').forEach(removeBtn => {
    removeBtn.addEventListener('click', removeHandler);
  })
}
window.addEventListener('load', init);