var lastPositionScrollTop = 0;

module.exports = function scrollFunction() {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.querySelector(".navbar").classList.add('navbar-opacity');
	} else {
		document.querySelector(".navbar").classList.remove('navbar-opacity');
	}
};

