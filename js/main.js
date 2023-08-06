let reviews = {};
function saveHandler(event){
  const cardContent = event.target.closest('.cardContent'); // 클릭 된 버튼에 가장 가까운 부모요소 cardContent 찾기
  const cardId = cardContent.id; // cardContent의 ID 값을 cardId에 할당
  const reviewText = cardContent.querySelector('.review').value; // 입력 된 리뷰를 reviewText 에 할당
  reviews[cardId] = reviewText; // 각 카드를 고유하게 식별하여 reviewText를 reviews 객체에 저장

  // 리뷰를 localStorage에 저장, JSON 문자열로 저장을 한다.
  localStorage.setItem('reviews', JSON.stringify(reviews));
}
function removeHandler(event) {
  const cardContent = event.target.closest('.cardContent');
  const cardId = cardContent.id;

  // 리뷰를 localStorage에서 제거
  delete reviews[cardId];
  localStorage.setItem('reviews', JSON.stringify(reviews));

  // 리뷰 입력 필드 초기화
  cardContent.querySelector('.review').value = '';
}
function init(){
  /* localStorage에 저장된 리뷰가 있다면 불러오기 
     JSON에 저장된 문자열을 객체로 변환해서 reviews에 할당
     reviews 객체에서 cardId값으로 구분하여 저장된 리뷰를 불러옴*/
  const storedReviews = localStorage.getItem('reviews');
  if(storedReviews) {
    reviews = JSON.parse(storedReviews);
    for (const cardId in reviews) {
      const reviewText = reviews[cardId];
      document.getElementById(cardId).querySelector('.review').value = reviewText;
    }
  }

  // 저장버튼과 삭제버튼 이벤트 리스너 등록
  document.querySelectorAll('.save').forEach(saveBtn => {
    saveBtn.addEventListener('click', saveHandler);
  });
  document.querySelectorAll('.remove').forEach(removeBtn => {
    removeBtn.addEventListener('click', removeHandler);
  })
}
window.addEventListener('load', init);