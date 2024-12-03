Fancybox.bind("[data-fancybox]", {
	// Your custom options
});

document.addEventListener("DOMContentLoaded", () => {
	// Привязка ко всем элементам с data-fancybox-modal
	document.querySelectorAll("[data-fancybox-modal]").forEach((el) => {
		el.addEventListener("click", (e) => {
			e.preventDefault();

			const modalID = el.getAttribute("data-src"); // Получаем ID модалки из data-src

			Fancybox.show([
				{
					src: modalID, // ID модального окна
				},
			]);
		});
	});
});

const inputs = document.querySelectorAll(".phone");

inputs.forEach((input) => {
	intlTelInput(input, {
		placeholderNumberType: false,
		initialCountry: "ua",
		separateDialCode: true,
		utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Для валидации
	});
});

function tabsCustom(tab) {
	const tabs = document.querySelectorAll(tab);
	if (tabs.length === 0) return;

	tabs.forEach(function (element) {
		const tabsCaption = element.querySelector(".tabs__caption");
		const tabsBtn = tabsCaption.querySelectorAll(".tabs__btn");
		const tabsWrap = element.querySelector(".tabs__wrap");
		const tabsContent = tabsWrap.querySelectorAll(".tabs__content");
		const random = Math.trunc(Math.random() * 1000);

		// Присваиваем уникальные data-атрибуты для связи кнопок и контента
		tabsBtn.forEach(function (el, index) {
			const data = `tab-content-${random}-${index}`;
			el.dataset.tabBtn = data;
			const content = tabsContent[index];
			content.dataset.tabContent = data;

			// Добавляем обработчик на кнопку закрытия
			const btnClose = content.querySelector(".tabs__btnClose");
			if (btnClose) {
				btnClose.addEventListener("click", function (e) {
					e.stopPropagation(); // Останавливаем всплытие события

					// Убираем классы active у текущего контента и связанной кнопки
					content.classList.remove("active");
					tabsBtn.forEach(function (btn) {
						if (btn.dataset.tabBtn === data) {
							btn.classList.remove("active");
						}
					});
				});
			}
		});

		// Обработчик клика на табы
		element.addEventListener('click', function (e) {
			const btn = e.target.closest("[data-tab-btn]:not(.active)");
			if (!btn) return;

			const data = btn.dataset.tabBtn;
			const tabsAllBtn = this.querySelectorAll("[data-tab-btn]");
			const content = this.querySelectorAll("[data-tab-content]");

			// Обновляем классы активности у кнопок и контента
			tabsAllBtn.forEach(function (el) {
				el.dataset.tabBtn === data ? el.classList.add('active') : el.classList.remove('active');
			});

			content.forEach(function (el) {
				el.dataset.tabContent === data ? el.classList.add('active') : el.classList.remove('active');
			});
		});
	});
}

if (document.querySelector('.tabs')) {
	tabsCustom('.tabs');
}
