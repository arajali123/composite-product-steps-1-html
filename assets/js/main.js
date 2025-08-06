// Cart Js
document.addEventListener("DOMContentLoaded", function () {
	const cartList = document.querySelector(".cart-list");
	const itemTemplate = document.querySelector(
		".cart-list-item-template .cart-list-item"
	);
	const summaryNumber = document.querySelector(".select-number");
	let itemCount = 0;

	function updateSummary() {
		if (summaryNumber) {
			summaryNumber.textContent =
				itemCount === 1 ? "(1 item)" : `(${itemCount} items)`;
		}
	}

	document.querySelectorAll(".primary-btn").forEach(function (addButton) {
		addButton.addEventListener("click", function () {
			addButton.classList.add("loading");
			addButton.disabled = true;

			setTimeout(function () {
				const newItem = itemTemplate.cloneNode(true);
				cartList.appendChild(newItem);
				itemCount++;
				updateSummary();
				console.log("Item added");

				addButton.classList.remove("loading");
				addButton.disabled = false;
			}, 1000);
		});
	});

	cartList.addEventListener("click", function (e) {
		const removeButton = e.target.closest(".remove-btn");
		if (removeButton) {
			const item = removeButton.closest(".cart-list-item");
			if (item) {
				item.remove();
				itemCount = Math.max(0, itemCount - 1);
				updateSummary();
				console.log("Item removed");
			}
		}
	});
});

// Tabs JS
document.addEventListener("DOMContentLoaded", function () {
	const tabLinks = document.querySelectorAll(
		".tabs-product-main-wrapper .tab-button"
	);
	const tabBodies = document.querySelectorAll(
		".tabs-product-main-wrapper .tabs-main-wrap"
	);
	let timerOpacity;

	tabLinks.forEach(tabLink => {
		tabLink.addEventListener("click", function (e) {
			e.preventDefault();
			e.stopPropagation();

			// Clear any previous timer
			clearTimeout(timerOpacity);

			// Remove active classes
			tabLinks.forEach(link => link.classList.remove("active"));
			tabBodies.forEach(body => {
				body.classList.remove("active");
				body.classList.remove("active-item");
			});

			// Add active class to clicked tab
			this.classList.add("active");

			// Get the target tab content element
			const targetId = this.getAttribute("href");
			const targetBody = document.querySelector(targetId);

			if (targetBody) {
				targetBody.classList.add("active");

				// Add 'active-content' after slight delay for transition
				timerOpacity = setTimeout(() => {
					targetBody.classList.add("active-item");
				}, 50);
			}
		});
	});
});
