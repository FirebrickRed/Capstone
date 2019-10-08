console.log("hewwow");

if(document.getElementById('addItem') != null){
  console.log('adding item');
  document.getElementById('addItem').addEventListener('click', () => {
    console.log('click');
  })
}