(function() {
  var link = document.querySelector(".enter"),
      popup = document.querySelector(".enter-form"),
      close = document.querySelector(".close"),
      login = document.querySelector("#enter-1"),
      password = document.querySelector("#enter-2"),
      storage = localStorage.getItem("login"),
      booking = document.querySelector("#book-form"),
      book_date = document.querySelector("#book_date"),
      book_time = document.querySelector("#book_time"),
      book_name = document.querySelector("#book_name"),
      book_phone = document.querySelector("#book_phone"),
      smallImg, bigImg, i,
      container, btn, photos, photoVisible;

  // Форма входа
  // Открытие с анимацией
  link.addEventListener("click", function(event) {
      event.preventDefault();
      popup.classList.remove("enter-form-error");
      popup.classList.add("enter-form-show");
      popup.classList.add("enter-form-animation");
      if (storage) {
        login.value = storage;
        password.focus();
      } else {
        login.focus();
      }
  });

  // Выдача ошибки, если хотя бы одно поле пустует
  popup.addEventListener("submit", function(event) {
    if (!login.value || !password.value) {
      event.preventDefault();
      popup.classList.remove("enter-form-error");
      popup.classList.remove("enter-form-animation");
      setTimeout(function() { popup.classList.add("enter-form-error") }, 1);
    } else {
      localStorage.setItem("login", login.value);
    }
  });

  // Закрытие формы по нажатию на Esc
  window.addEventListener("keydown", function(event) {
    if (event.keyCode == 27
      && popup.classList.contains("enter-form-show")) {
      popup.classList.remove("enter-form-show");
      popup.classList.remove("enter-form-animation");
    }
  });

  // Закрытие формы по нажатию на крестик или в любое место за пределами формы
  close.addEventListener("click", function(event) {
    event.preventDefault();
    popup.classList.remove("enter-form-show");
    popup.classList.remove("enter-form-animation");
  });

  document.addEventListener("click", function(e) {
    var formOpened = document.querySelector(".enter-form").classList.contains("enter-form-show");
    if ((formOpened == true) && (!(e.target == link)) && (!(e.target==popup))
      && (!(e.target.parentNode==popup)) && (!(e.target.parentNode.parentNode==popup))) {
      popup.classList.remove("enter-form-show");
      popup.classList.remove("enter-form-animation");
    }
  });

  // Простейшая валидация формы бронирования - ошибка, если хотя бы одно поле пустует
  if (!(booking===null)) {
    booking.addEventListener("submit", function(event) {
      if (!book_date.value || !book_time.value || !book_name.value || !book_phone.value) {
        event.preventDefault();
        alert("Пожалуйста, заполните все поля формы");
      }
    });
  }

  // Смена фото в галерее на главной странице
  container = document.querySelector(".gallery");
  if (!(container===null)) {
    btn = container.querySelectorAll(".btn"),
    photos = Array.prototype.slice.call(document.querySelectorAll(".int-photo")),
    photoVisible = document.querySelector(".int-photo.visible");

    for (i = 0; i<btn.length; i++) {
      btn[i].addEventListener("click", function(event) {
        var visible;
        event.preventDefault();
        visible = document.getElementsByClassName("int-photo visible"),
        indexOfVisible = photos.indexOf(visible[0]);

        if ((this.className === "btn next") && (indexOfVisible < (photos.length-1))) {
          photos[indexOfVisible].classList.remove('visible');
          photos[indexOfVisible+1].classList.add('visible');
        }
        else if ((this.className === "btn prev") && (indexOfVisible > 0)) {
          photos[indexOfVisible].classList.remove('visible');
          photos[indexOfVisible-1].classList.add('visible');
        }
      });
    }
  }

  // Смена фото в карточке товара
  smallImg = document.querySelectorAll(".item-img.small img"),
  bigImg = document.querySelector(".item-img.big img");

  for (i = 0; i<smallImg.length; i++) {
    smallImg[i].addEventListener("click", function(event) {
      var imgPath = (this.getAttribute("src").slice(0, -4)) + "b.jpg";
      event.preventDefault();
      bigImg.setAttribute("src", imgPath);
    });
  }
})();
