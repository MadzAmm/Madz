if (!localStorage.getItem('counter')) {
  localStorage.setItem('counter', 0);
}

function count() {
  let counter = localStorage.getItem('counter');
  counter++;
  document.querySelector('#likes').innerHTML = counter;
  localStorage.setItem('counter', counter);
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#likes').innerHTML = localStorage.getItem('counter');
  document.querySelector('#icon').onclick = count;
});
