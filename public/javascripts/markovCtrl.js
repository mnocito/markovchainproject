var app = angular.module('markov', ['ngMaterial', 'ngAnimate']);
app.controller('markovCtrl', function($scope, $http, $window) {
	$scope.totalRounds = 0
	$scope.quote = false
	$scope.processing = false
	$scope.score = 0
	$window.document.title = "Savage"
	$scope.author = "Aristotle"
	$scope.authorNames = {
		"ARISTOTLE": "Aristotle",
		"DICKENS": "Charles Dickens",
		"DOYLE": "Sir Arthur Conan Doyle",
		"EMERSON": "Ralph Waldo Emerson",
		"TWAIN": "Mark Twain (Samuel Clemens)",
		"JEFFERSON": "Thomas Jefferson",
		"POE": "Edgar Allan Poe",
		"PLATO": "Plato"
	}
	$scope.authorPhotos = {
		"ARISTOTLE": "https://media1.britannica.com/eb-media/84/87984-004-5ADE9ACA.jpg",
		"DICKENS": "http://www.theartsdesk.com/sites/default/files/images/stories/BOOKS/jasper_rees/Dickens%20jacket.jpg",
		"DOYLE": "https://si.wsj.net/public/resources/images/ED-AK711_doyle_DV_20091222121300.jpg",
		"EMERSON": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Ralph_Waldo_Emerson_ca1857_retouched.jpg",
		"TWAIN": "https://upload.wikimedia.org/wikipedia/commons/2/25/Mark_Twain,_Brady-Handy_photo_portrait,_Feb_7,_1871,_cropped.jpg",
		"JEFFERSON": "https://upload.wikimedia.org/wikipedia/commons/4/46/T_Jefferson_by_Charles_Willson_Peale_1791_2.jpg",
		"POE": "https://media1.britannica.com/eb-media/52/76652-004-60D7B595.jpg",
		"PLATO": "https://media1.britannica.com/eb-media/88/149188-004-E9F3D5B9.jpg"
	}
	$scope.loadauthor = function() {
		$window.document.title = "Loading..."
		$scope.quote = false
		if (getKeyValue($scope.authorNames, $scope.author)) {
			var authorName = getKeyValue($scope.authorNames, $scope.author)
			$scope.authorPhoto = $scope.authorPhotos[authorName]
			$scope.processing = true
			$http.get('/sentences/' + authorName)
				.success(function(res) {
					$window.document.title = "Savage"
					$scope.processing = false
					if (res.sentence != "Couldn't find author.") {
						console.log(res.sentences)
						$scope.option1 = res.sentences[0]
						$scope.option2 = res.sentences[1]
						$scope.quote = true
					}
				})
		} else {
			// this should never happen, but just in case
			$scope.sentence = {
				text: "Couldn't find author."
			}
			$scope.processing = false
		}
	}
	$scope.log = function(text) {
		console.log(text)
	}
	$scope.changeScore = function(quoteBool) {
		$scope.quote = false
		if (quoteBool) {
			$scope.oneup = true
			setTimeout(function() {
				$scope.oneup = false
			}, 1000)
		}
		$scope.score += (quoteBool === true ? 1 : 0)
		$scope.totalRounds++
	}
	function getKeyValue(obj, value) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (obj[key] === value)
					return key;
			} else {
				return;
			}
		}
	}
});