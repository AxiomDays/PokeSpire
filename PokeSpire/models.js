//type adv [X]
//elements cards (X)
//implement STR mechnic (X)
//add poison and blind (X)
//item cards like tcg(X)
//capture mechanic - storage needed (more or less)
//ability to see enemy nxt move (X)
//STAB???(X)
//game over(X)

//save deck/status in local.storage

//weakness, vulnerable, exalted,(X)
//poison, paralyze on cards [limited draw?](untested)
//burn on card use(untested)

//weather on map node add later

// relics
// shop 
//local storage

//stab(x)
//next move(x)
//victory(x)
//gameover(x)
//CREATE STORE with DElete option(untested)
// set up a page to test player and deck creation (x)
//button to recreate char and deck, and button to go to battle menus (x)
//generate new enemy object for each fight [enemy generator function][generates segments?] (x)
//test relics
//attempt saving

//KEY
//-test store [mostly]
//-weather [scrap maybe implement later]
//-enemy genertion + segment generator w/ boss fight [mostly]
//fake implement relics
//poke-center [done]
//-saving



//nerf enemy damage and make player hp carry over
//nerf type damage boost and STAB effectiveness
//cards not showing scaled damage
//give elemental moves unique names and not just type names(partial)
//fix debug cards and enemies
//implement relics properly
//modify card description
//implement card element type change and delete menu
//give legendaries strong capture cards
//address relic check fxn

function effectAnimShake(self) {
	if (self instanceof Player) {
		let playersprite = document.getElementById("player-sprite")
		if (!playersprite) {
			console.error("Error: Could not find the element with ID.");
		}
		playersprite.classList.remove("do-effect")
		void playersprite.offsetWidth;
		playersprite.classList.add("do-effect")
	} else {
		let enemysprite = document.getElementById("enemy-sprite")
		if (!enemysprite) {
			console.error("Error: Could not find the element with ID.");
		}
		enemysprite.classList.remove("do-effect")
		void enemysprite.offsetWidth;
		enemysprite.classList.add("do-effect")
	}
} //filler for buff animation

document.addEventListener("DOMContentLoaded", () => {
	let output = document.getElementById("output");
	if (!output) {
		console.error("Error: Could not find the element with ID.");
	}
	let consol = document.getElementById("console");
	if (!consol) {
		console.error("Error: Could not find the element with ID.");
	}
	let banner = document.getElementById("banner");
	if (!banner) {
		console.error("Error: Could not find the element with ID.");
	}
});

export const getRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};

export const takeRandomFromArray = (arr) => {
	let rand = Math.floor(getRandomNumber(0, arr.length));
	return arr[rand];
}

function doNothing() {
	;;
	//wallahi im taking the piss
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

export const randomProperty = function (obj) {
	var keys = Object.keys(obj);
	return obj[keys[keys.length * Math.random() << 0]];
};

export function capture(deck, enem, pokeBallLevel = 20) {
	let probabilityOfCapture = 1;
	let rand = getRandomNumber(1, 100)
	if (enem.HP < (enem.MaxHP / 2)) {
		let enemyCriticalHPPercentage = (((enem.MaxHP / 2) - enem.HP) / (enem.MaxHP / 2)) * 40
		probabilityOfCapture = pokeBallLevel + Math.round(enemyCriticalHPPercentage);
		enem.boosts.forEach((boost) => { probabilityOfCapture += 10 })
		console.log("probability is, ", probabilityOfCapture)
		console.log("chance is, ", rand)
	}
	if (rand <= probabilityOfCapture) {
		say(enem.name, "was captured successfully.");
		deck.addCard(enem.captureCard);
		console.log("capture card added succesfully, ", deck)
		return true
	} else {
		say("", "Oh no! It didn't work!")
		return false
	}

}

function typeCheck(atkType, defType) {
	//function that takes two pokemon types and returns an appropriate scaling value and proper message
	//if poke has two types itll do it twice then add the values
	let returnVal = 1;
	const dataset = {
		normal: {
			half: ["rock", "steel"],
			double: ["shadow"],
			null: ["ghost"],
		},
		fighting: {
			half: ["flying", "poison", "bug", "psychic", "fairy"],
			double: ["shadow", "normal", "rock", "steel", "ice", "dark"],
			null: ["ghost"],
		},
		flying: {
			half: ["rock", "steel", "electric"],
			double: ["shadow", "fighting", "bug", "grass"],
			null: [],
		},
		poison: {
			half: ["poison", "rock", "ground", "ghost"],
			double: ["shadow", "grass", "fairy"],
			null: ["steel"],
		},
		ground: {
			half: ["bug", "grass"],
			double: ["shadow", "poison", "rock", "steel", "fire", "electric"],
			null: ["flying"],
		},
		rock: {
			half: ["fighting", "ground", "steel"],
			double: ["shadow", "flying", "rock", "fire", "ice"],
			null: [],
		},
		bug: {
			half: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
			double: ["shadow", "grass", "psychic", "dark"],
			null: [],
		},
		ghost: {
			half: ["dark"],
			double: ["shadow", "ghost", "psychic"],
			null: ["normal"],
		},
		steel: {
			half: ["steel", "fire", "water", "electric"],
			double: ["shadow", "rock", "ice", "fairy"],
			null: [],
		},
		fire: {
			half: ["rock", "fire", "water", "dragon"],
			double: ["shadow", "bug", "steel", "grass", "ice"],
			null: [],
		},
		water: {
			half: ["water", "grass", "dragon"],
			double: ["shadow", "ground", "rock", "fire"],
			null: [],
		},
		grass: {
			half: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
			double: ["shadow", "ground", "rock", "water"],
			null: [],
		},

		electric: {
			half: ["grass", "electric", "dragon"],
			double: ["shadow", "flying", "water"],
			null: ["ground"],
		},
		psychic: {
			half: ["steel", "psychic"],
			double: ["shadow", "fighting", "poison"],
			null: ["dark"],
		},
		ice: {
			half: ["steel", "fire", "water", "psychic"],
			double: ["shadow", "flying", "ground"],
			null: [],
		},
		dragon: {
			half: ["steel"],
			double: ["shadow", "dragon"],
			null: ["fairy"],
		},
		dark: {
			half: ["fighting", "dark", "fairy"],
			double: ["shadow", "ghost", "psychic"],
			null: [],
		},
		fairy: {
			half: ["poison", "steel", "fire"],
			double: ["shadow", "fighting", "dragon", "dark"],
			null: [],
		},

		shadow: {
			half: ["shadow"],
			double: ["fire", "water", "grass", "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "electric", "psychic", "ice", "dragon", "dark", "fairy"],
			null: []
		}
	};

	defType.forEach((type) => {
		if (dataset[atkType].half.includes(type)) {
			returnVal *= 0.5;
		} else if (dataset[atkType].double.includes(type)) {
			returnVal *= 1.5;
		} else if (dataset[atkType].null.includes(type)) {
			returnVal *= 0;
		}
		console.log(
			"type is ",
			atkType,
			defType,
			dataset[atkType].half,
			dataset[atkType].double,
			dataset[atkType].null,
			"returnval is ",
			returnVal,
		);
	});

	return returnVal;
}

function typeEffectLine(value) {
	if (value == 0) {
		return "It has no effect... ";
	} else if (value == 0.25) {
		return "It's not at all effective... ";
	} else if (value == 0.5) {
		return "It's not very effective... ";
	} else if (value == 1.5) {
		return "It's Super Effective! ";
	} else if (value == 2.25) {
		return "It's extremely effective! ";
	} else {
		return "";
	}
}

function say(nom, txt) {
	console.log(nom, " ", txt);
	let outputBox = document.getElementById("output");
	if (!outputBox) {
		console.error("Error: Could not find the element with ID.");
	}
	if (outputBox) {
		outputBox.insertAdjacentHTML('beforeend', `${nom} ${txt} </br>`)
		requestAnimationFrame(() => {
			outputBox.scrollTop = outputBox.scrollHeight;
		});
	}

}

function victoryLap(player) {
	console.log("you won");
	player.levelUp(25)
	player.reset()
}

function gameOver() {
	console.log("thats rough buddy")
	player.hardReset()
}

export class GameController {
	constructor(player, enem, deck, weather) {
		this.player = player;
		this.enem = enem;
		this.deck = deck;
		this.weather = weather;
		this.combat = 1;
		this.gameState = "INTRODUCTION";
		this.overKill = false;

	}

	handlePlay(card) {
		if (this.gameState != "INTRODUCTION") return;
		if (card.unplayable) return;
		if (this.player.mana < card.cost) { console.log("not enough mana"); return } else {
			card.play(this.enem, this.player, this.deck, this.weather);
			if (this.deck.firstCardPlayed == false && this.player.relicList.includes("Quick Claw")) {
				card.play(this.enem, this.player, this.deck, this.weather);
			}
			this.player.cardsPlayed++
			this.deck.firstCardPlayed = 1
			this.deck.discard(card, this.enem, this.player, this.deck, this.weather, true)
		}

		if ((this.player.gameStatusList.find((arr) => arr.includes("gasket"))) && (getRandomNumber(1, 10) >= 9)) {
			say("Team Gasket", "comes to your aid!");
			switch (getRandomNumber(1, 3)) {
				case 1:
					this.enem.take(this.enem.MaxHP / 10)
					break;
				case 2:
					this.player.heal(this.player.MaxHP / 15)
					break;
				case 3:
					this.player.OSheal(this.player.MaxHP / 5)
					break;
				default:
					this.player.OSheal(this.player.MaxHP / 5)
					break;
			}
		}
	}

	handleStatus() {
		if (this.player.gameStatusList.find((arr) => arr.includes("tracked"))) {
			this.deck.tracked = true;
		}
		for (let i = this.player.boosts.length - 1; i >= 0; i--) {
			let boost = this.player.boosts[i]
			if (boost[0] == "barrier") { continue; }
			if (boost[0] == "thorns") { continue; }

			boost[1] -= 1;
			if (boost[1] <= 0) {
				this.player.boosts.splice(i, 1);
			}
		}
		console.log("player boosts", this.player.boosts);

		this.enem.boosts.forEach((boost) => {
			if (boost[0] == "barrier") { return; }
			if (boost) {
				boost[1] -= 1;
				if (boost[1] <= 0) {
					this.enem.boosts.splice(this.enem.boosts.indexOf(boost), 1);
				}
			}
		});
		console.log("eenem boosts", this.enem.boosts);
	}

	handleGameStatus() {
		for (let i = this.player.gameStatusList.length - 1; i >= 0; i--) {
			let boost = this.player.gameStatusList[i]
			if (boost[0] == "barrier") { continue; }
			if (boost[0] == "thorns") { continue; }

			boost[1] -= 1;
			if (boost[1] <= 0) {
				if (boost[0] == "tracked") {
					this.deck.tracked = false
				}
				if (boost[0] == "egg") {
					let tempcard = this.deck.cards.find((card) => card.skill == "mysterious_egg")
					this.deck.removeCard(tempcard)
					this.deck.addCard(cardGenerator("ancientpower"))
				}

				this.player.gameStatusList.splice(i, 1);
			}
		}
		console.log("player game fx", this.player.gameStatusList);
	}

	endTurn(pokemon) {
		this.player.totalTurns++
		if (this.player.HP <= 0) {
			this.gameState = "LOSS";
			gameOver()
		} else if (this.enem.HP <= 0) {
			this.gameState = "WIN";
			if (this.enem.HP <= ((this.enem.MaxHP / 3) * -1)) {
				this.overKill = true
			}
			victoryLap(pokemon);
			this.handleGameStatus();
		} else {
			this.gameState = "RETALIATION";
			console.log("turn ended");
			this.player.periodicRelicCheck(this.player, this.enem, this.deck)
			this.player.mana = this.player.maxmana;
			if ((this.player.gameStatusList.find((arr) => arr.includes("distress"))) && (getRandomNumber(1, 10) > 5)) {
				this.player.mana -= 2;
				say("", "You're distressed!")
			}
			setTimeout(() => {
				console.log("Played Phase!");
				this.handleRetaliate();
				this.handleStatus();

				if (this.player.boosts.find((arr) => arr.includes("poison"))) {
					let poisonSum = this.player.boosts.find((arr) => arr.includes("poison"))[1]
					say(this.player.name, "is poisoned!");
					this.player.take((this.player.DOTval / 5) * poisonSum);
				}
				this.player.OHP = 0;
				this.player.tempSTR = 0;
				if (this.player.HBeamCheck == true) {
					//reset per turn here
					say(this.player.name, "is recovering from Hyper Beam!");
					this.player.HBeamCheck = false;
					this.player.mana = 0;
				}
				this.player.levelUp(this.deck.evoRemainderandFleetingRemoval());
				this.deck.createHand(this.enem, this.player, this.deck, this.weather);
			}, 400);
			if (player.gameStatusList.find((arr) => arr.includes("manaNerf"))) {
				player.mana -= 1;
			}


		}
	}

	handleRetaliate() {
		if (this.gameState != "RETALIATION") return;
		if (!this.enem.boosts.find((arr) => arr.includes("flinch"))) { this.enem.retaliate(this.player); } else {
			say(this.enem.name, "flinched! This is your chance!")
		}
		this.gameState = "INTRODUCTION";
		if (this.player.HP <= 0) {
			this.gameState = "LOSS";
			gameOver()
		}
	}
}

export class Card {
	constructor(type, skill, value, cost, genre = "move", arithBoost = false, limited = false, pierce = false, multihit = false, freebie = false, multihitCount = 2, unplayable = false, fleeting = false) {
		//le genre est le type de le card (une attaque ou une iteme), ne le melangez pas avec des types de pokemon
		this.type = type;
		this.genre = genre;
		this.skill = skill;
		this.selfValueBoost = 0
		this.value = (value + this.selfValueBoost);
		this.multihit = multihit
		this.multihitCount = multihitCount
		this.cost = !arithBoost ? cost : (freebie ? 0 : undefined);
		this.price = Math.floor((this.value * 2) + ((this.cost / 6) * 100))
		this.DefValue = value / 2;
		this.hasPlayed = false;
		this.fleeting = fleeting;
		this.limited = limited; //playable once per fight
		this.arithBoost = arithBoost;
		this.pierce = pierce;
		this.desc = cardDescription(this.skill, this.value, this.DefValue);
		this.freebie = freebie
		this.unplayable = unplayable

		this.selfValueBoost = 0
	}

	changeType(newType) {
		if (newType == undefined) {
			alert("nothing happened big bro")
		} else {
			this.type = newType
		}
	}

	thorn_check(trigger, target, self) {
		let mul = 1
		if (trigger == "thorn_trigger" && target.thorns > 0) {
			say(self.name, "was countered!")
			if (self.relicList.includes("Rocky Helmet")) {
				mul = 2
			}
			self.take(target.thorns * mul)
		}
		if (trigger == "thorn_trigger") {
			if (self.relicList.includes("Life Orb")) {
				self.recoil(2)
			}
			if (self.relicList.includes("Berserk Gene")) {
				if (getRandomNumber(1, 10) > 6) {
					statusEffectsPush(self.boosts, ["paralyze", 1])
				}
			}
		}
	}

	discardPlay(target, self, deck, weather) {
		let outputVal = this.value;
		if (self.signedSTR != 0) {
			outputVal += self.signedSTR;
		}

		if (self.tempSTR != 0) {
			outputVal += self.tempSTR;
		}
		if (self.boosts.find((arr) => arr.includes("weakness"))) {
			say(self.name, "is weakened! ");
			outputVal *= 0.75;
		}
		this.thorn_check(
			discardSkillCheck(
				self,
				target,
				deck,
				this.type,
				this.skill,
				outputVal,
				this.DefValue,
				this.piercing,
				weather,
				this
			), target, self);
	}

	freeWeatherCheck(weather, skill) {
		if ((weather == "rainy" && skill == "water2") || (weather == "foggy" && skill == "electric3") ||
			(weather == "foggy" && skill == "fairy2")) {
			return true
		}
	}

	firstCardPlayedCheck(skill) {
		switch (skill) {
			case "dark3":
				return true
				break;
			default:
				return false
				break;
		}
	}

	play(target, self, deck, weather, free = false) {
		console.log(`deck state is: ${deck.firstCardPlayed}`)
		let outputVal = this.value;

		if (deck.CustapBerryFreebie) { this.freebie = true, deck.CustapBerryFreebie = false }
		else if (free == true) { this.freebie = true }
		else if (this.freeWeatherCheck(weather, this.skill)) { this.freebie = true }
		else if (this.firstCardPlayedCheck(this.skill) && deck.firstCardPlayed == false) { this.freebie = true }
		else if (self.relicList.includes("Choice Scarf") && deck.firstCardPlayed == false) { this.freebie = true }
		else { this.freebie = false }

		if (this.unplayable) { console.log("unplayable"); return };
		if (self.mana < this.cost) { console.log("not enough mana"); return };
		if (this.arithBoost == true) {
			if (self.mana == 0) return;
			let arithCost = self.mana
			outputVal += (outputVal * (0.5 * arithCost))
			self.mana = 0
		}

		if (this.hasPlayed) { console.log("already played"); return };
		if (self.shadow == true) {

			if (getRandomNumber(1, 10) >= 6) { self.recoil(2); outputVal *= 2; self.mana -= 1; say(self.name, "'s darkness flares!") }
		}

		if ((weather == "rainy" && this.type == "water") || (weather == "sunny" && this.type == "fire") || (weather == "windy" && this.type == "flying")) {
			outputVal *= 1.25;
			say("", "The weather enhances this attack!")
		}

		if ((weather == "rainy" && this.type == "fire") || (weather == "sunny" && (this.type == "water" || this.type == "ice"))) {
			outputVal *= 0.75;
			say("", "The weather sours your mood...")
		}

		if (self.relicList.includes("Life Orb")) {
			outputVal *= 1.4
		}

		if (self.relicList.includes("Berserk Gene")) {
			outputVal *= 1.4
		}

		if (self.signedSTR != 0) {
			outputVal += self.signedSTR;
		}

		if (self.tempSTR != 0) {
			outputVal += self.tempSTR;
		}
		if (self.boosts.find((arr) => arr.includes("weakness"))) {
			say(self.name, "is weakened! ");
			outputVal *= 0.75;
		}

		if (self.boosts.find((arr) => arr.includes("burn"))) {
			say(self.name, "is burning!");
			self.take(self.MaxHP / 25)
		}

		if (self.boosts.find((arr) => arr.includes("paralyze"))) {
			say(self.name, "is paralyzed and can't move");
			let boost = self.boosts.find((arr) => arr.includes("paralyze"))
			if (boost) {
				boost[1] -= 1;
				if (boost[1] <= 0) {
					self.boosts.splice(self.boosts.indexOf(boost), 1);
				}
			}
			if (!this.arithBoost) { self.mana -= this.cost };
			this.hasPlayed = true;
			return
		}

		if (self.typeBoost.length > 0 && self.typeBoost[0] == this.type) {
			console.log(`${this.type} is being boosted lowk rn`)
			outputVal *= self.typeBoost[1]
			self.typeBoost = []
		} else {
			console.log(self.typeBoost)
		}

		if (this.genre == "move") {
			for (let i = 0; i < this.multihitCount; i++) {
				if (i < 1 || this.multihit == true) {
					switch (this.skill) {
						case "strike":
							this.thorn_check(target.take(outputVal * self.strikeScaling[1], this.type, this.piercing), target, self);
							break;
						case "shield":
							self.OSheal(this.DefValue * self.defScaling[1], this.type)
							break;
						case "flash":
							this.thorn_check(target.take(outputVal * self.flashScaling[1], this.type, this.piercing), target, self);
							break;
						case "heal":
							self.heal(this.DefValue, this.type);
							break;
						default:
							this.thorn_check(
								skillCheck(
									self,
									target,
									deck,
									this.type,
									this.skill,
									(outputVal * (self.strikeScaling[1] * self.flashScaling[1] / 2)),
									this.DefValue * self.defScaling[1],
									this.piercing,
									weather,
									this
								), target, self);
							break;
					}
				}
			}
		} else if (this.genre == "item") {
			itemCheck(self, target, this.type, this.skill, outputVal, this.DefValue, deck);
		}
		if (!this.freebie && !this.arithBoost) { self.mana -= this.cost; }
		self.levelUp(this.cost)
		this.hasPlayed = true;
		console.log(player.vals);
	}
}

export class Relic {
	constructor(type, value, name, price, isBerry = false) {
		this.name = type == "gold" ? "Money" : name
		this.type = type
		this.price = price
		this.value = value
		this.isBerry = isBerry
	}

	addRelic(self) {
		if (this.type == "gold") {
			self.gold += this.value
			console.log("cash money added")
		} else {
			if (!self.relicList.includes(this.name)) {
				self.relicList.push(this.name)
				console.log("relic added !?", self.relicList)
			} else {
				self.gold += this.price
			}
		}
	}

	removeRelic(self) {
		if (self.relicList.includes(this.name)) {
			const relic = self.relicList.find((item) => item.includes(this.name));
			if (relic) {
				self.relicList.splice(self.relicList.indexOf(relic), 1);
			}
		}
	}
}

export class Deck {
	constructor(cards) {
		this.cards = cards;
		this.hand = [];
		this.discardPile = [];
		this.shuffledCards = [];
		this.banishedCards = [];// limited cards go here
		this.maxCardLimit = this.cards.length;
		let macroHand = [...this.cards];
		this.shuffledCards = shuffleArray(macroHand);
		this.maxHandLimit = 5;
		this.startDrawLimit = 5;
		this.firstCardPlayed = 0;
		this.tracked = false;
		this.trackedCardDrawn = false
		this.CustapBerryFreebie = false
	}

	addCard(card) {
		this.cards.push(card);
		this.shuffledCards.push(card)
		this.maxCardLimit++;
	}

	addABunchOfCards(newCards) {
		newCards.forEach((card) => {
			this.cards.push(card);
			this.shuffledCards.push(card)
			this.maxCardLimit++;
		});
	}

	resetDeck() {
		this.shuffledCards = shuffleArray([...this.cards]);
		this.hand = []
		this.banishedCards = [];
	}

	removeCard(card) {
		console.log(card, "removed yippeee???");
		this.cards.splice(this.cards.indexOf(card), 1);
		this.discardPile.splice(this.discardPile.indexOf(card), 1);
		this.maxCardLimit--;
	}

	draw(count = 1) {
		for (let i = 0; i < count; i++) {
			if (this.hand.length <= this.maxCardLimit && this.shuffledCards.length >= 0) {
				if (this.shuffledCards.length == 0) {
					this.discardPile.forEach((card) => {
						this.shuffledCards.push(card);
					});
					this.discardPile = [];
				}
				let currCard = ""
				if (this.tracked == true && (getRandomNumber(1, 10) >= 5) && this.trackedCardDrawn == false) {
					currCard = cardGenerator("tracked")
					this.trackedCardDrawn = true
				}
				else {
					currCard = this.shuffledCards.pop()
				}
				currCard.hasPlayed = false;
				this.hand.push(currCard);
				return currCard
			}
		}
	}

	discard(card, target, self, deck, weather, noSkill = false) {
		if (this.hand.length > 0) {
			if (noSkill == false) {
				card.discardPlay(target, self, deck, weather)
				console.log("BREAKING LOGIC")
			}
			if (card.limited == true) {
				card.hasPlayed = false;
				this.banishedCards.push(this.hand.splice(this.hand.indexOf(card), 1)[0])
			} else {
				this.discardPile.push(this.hand.splice(this.hand.indexOf(card), 1)[0]);
			}
			if (card.hasPlayed == true && card.fleeting == true) {
				this.removeCard(card);
			}
			if (card.hasPlayed == true && card.genre == "item") {
				this.removeCard(card);
			}

		} else {
			console.log("hand SIZE MAN is currently ", this.hand.length);
			return `failed_discard`
		}

	}

	randomDiscard(target, self, deck, exclude = null) {
		let temp = takeRandomFromArray(this.hand)
		if (exclude) {
			console.log("exclude is beeing entered")
			if (temp == exclude) { console.log("temp == exclude and length is", deck.hand.length) }
			while (temp == exclude && deck.hand.length > 1) {
				console.log("temp is being reset")
				temp = takeRandomFromArray(this.hand)
			}
			if (temp == exclude && deck.hand.length <= 1) {
				console.log("random failed. discard check")
				return `failed_discard`
			}
		}

		return this.discard(temp, target, self, deck)
	}

	createHand(target, self, deck, weather) {
		this.trackedCardDrawn = false
		if (
			this.shuffledCards.length === 0 &&
			this.discardPile.length == this.maxCardLimit
		) {
			console.log("entered end of discard pile");
		}

		this.firstCardPlayed = 0;

		while (this.hand.length > 0) {
			this.discard(this.hand[0], target, self, deck, weather)
		};

		while (this.hand.length < this.startDrawLimit) {
			this.draw()
		}

		console.log("hand", this.hand);
		console.log("deck", this.shuffledCards);
		console.log("discard", this.discardPile);
		console.log("og deck", this.cards);
	}

	onDrawCheck(target, self, deck, weather, card) {
		switch (card.type) {
			case "growing_pains":
				self.mana -= 1
				break;
			default:
				break;
		}
	}

	evoRemainderandFleetingRemoval() {
		let extraEvo = 2;
		this.hand.forEach((card) => {
			if (card.hasPlayed == true) {
				if (card.cost != undefined) {
					extraEvo += card.cost;
				}
			}
			if (card.hasPlayed == true && card.fleeting == true) {
				this.removeCard(card);
			}

		});
		return extraEvo;
	}
}

export class Unit {
	constructor(name, type, HP, OHP) {
		this.name = name;
		this.type = type;
		this.HP = HP;
		this.MaxHP = HP;
		this.OHP = OHP;
		this.MaxOHP = OHP;
		this.signedSTR = 0;
		this.tempSTR = 0;
		this.boosts = [];
		this.DOTval = this.MaxHP / 50;
		this.FSval = 0;
		this.BURNval = 0;
		this.thorns = 0;
		this.focusBandSave = false;
		this.shadow = false

		this.damageTaken = 0
		this.damageHealed = 0
		this.totalTurns = 0
		this.cardsPlayed = 0
	}

	heal(value, type) {

		value = Math.round(value);
		if (type) {
			let ret = 1 / typeCheck(type, (this.shadow ? ["shadow"] : this.type));
			value *= ret;
			console.log(typeEffectLine(ret));
			output.innerHTML += typeEffectLine(ret);
		}
		this.HP += Math.round(value);
		this.damageHealed += Math.round(value);
		if (this.HP > this.MaxHP) {
			this.HP = this.MaxHP;
		}

		console.log(this.name + " healed for " + Math.round(value));
		if (output != undefined) {
			say(this.name, (" healed for " + Math.round(value) + ""))
		}

		this.doEffect()
	}
	OSheal(value, type) {

		if (type) {
			let ret = 1 / typeCheck(type, (this.shadow ? ["shadow"] : this.type));
			value *= ret;
			console.log(typeEffectLine(ret));
			output.innerHTML += typeEffectLine(ret);
		}
		if (this.boosts.find((arr) => arr.includes("fortress"))) {
			say(this.name, "is fortified! ");
			value *= 1.25;
		}
		this.OHP += Math.round(value);
		console.log(this.name + " gained " + Math.round(value) + " shield");
		say(this.name, (" gained " + Math.round(value) + " shield"))
		this.doEffect()
	}

	take(value, type, piercing = false, flat = false) {

		value = Math.round(value);
		if (this.boosts.find((arr) => arr.includes("barrier"))) {
			statusEffectsSpend(this.boosts, "barrier", 1);
			console.log("just removed barrier")
			say(this.name, "negated the attack!")
			return
		}
		this.damageTaken += Math.round(value > 1 ? value : 1)
		if (flat) {
			if (piercing) {
				this.HP -= Math.round(value > 1 ? value : 1)

			} else {
				let negatifRemainder = (this.OHP -= Math.round(value > 1 ? value : 1));
				if (negatifRemainder < 0) {
					this.OHP = 0;
					this.HP += negatifRemainder;
					if (this.relicList) {
						if (this.HP <= 0 && this.relicList.includes("Focus Band") && this.focusBandSave != true) {
							this.HP = 1;
							say(this.name, "held on!")
							this.focusBandSave = true;
						}
					}
				}
			}
			this.takeEffect()
			console.log(this.name + " took " + Math.round(value) + " damage");
			output.innerHTML += this.name + " took " + Math.round(value) + " damage" + "<br/>";

			return "thorn_trigger";
		}
		if (type) {
			let ret = typeCheck(type, (this.shadow ? ["shadow"] : this.type));
			value *= ret;
			console.log(typeEffectLine(ret));
			output.innerHTML += typeEffectLine(ret);
		}

		if (this.boosts.find((arr) => arr.includes("fortress"))) {
			say(this.name, "mitigates the damage! ");
			value *= 0.75;
		}

		if (this.boosts.find((arr) => arr.includes("vulnerable"))) {
			say(this.name, "is vulnerable! ");
			value *= 1.25;
		}

		if (this.boosts.find((arr) => arr.includes("frozen")) && type == ("normal" || "fighting" || "steel" || "rock" || "ground" || "flying")) {
			say(this.name, "is shattered! ");
			value *= 1.5;

		}
		if (piercing) {
			this.HP -= Math.round(value > 0 ? value : 1)
		} else {
			let negatifRemainder = (this.OHP -= Math.round(value > 0 ? value : 1));
			if (negatifRemainder < 0) {
				this.OHP = 0;
				this.HP += negatifRemainder;
				if (this.relicList) {
					if (this.HP <= 0 && this.relicList.includes("Focus Band") && this.focusBandSave != true) {
						this.HP = 1;
						say(this.name, "held on!")
						this.focusBandSave = true;
					}
				}
			}
		}
		this.takeEffect()
		console.log(this.name + " took " + Math.round(value) + " damage");
		say(this.name, (" took " + Math.round(value) + " damage"))
		return "thorn_trigger";
	}

	recoil(percentage, curr = false) {
		//here for relic checks
		if (this.relicList.includes("Shell Bell")) {
			this.signedSTR += 5
		}
		say(this.name, "hurts itself!")

		if (curr) {
			this.take(Math.floor(this.HP * (percentage / 100)))
		} else {
			this.take(Math.floor(this.MaxHP * (percentage / 100)))
		}
	}

	takeEffect() {
		if (this instanceof Player) {
			let playersprite = document.getElementById("player-sprite")
			if (!playersprite) {
				console.error("Error: Could not find the element with ID.");
			}
			playersprite.classList.remove("take-damage")
			void playersprite.offsetWidth;
			playersprite.classList.add("take-damage")
		} else {
			let enemysprite = document.getElementById("enemy-sprite")
			if (!enemysprite) {
				console.error("Error: Could not find the element with ID.");
			}
			enemysprite.classList.remove("take-damage")
			void enemysprite.offsetWidth;
			enemysprite.classList.add("take-damage")
		}
	}

	doEffect() {
		if (this instanceof Player) {
			let playersprite = document.getElementById("player-sprite")
			if (!playersprite) {
				console.error("Error: Could not find the element with ID.");
			}
			playersprite.classList.remove("do-effect")
			void playersprite.offsetWidth;
			playersprite.classList.add("do-effect")
		} else {
			let enemysprite = document.getElementById("enemy-sprite")
			if (!enemysprite) {
				console.error("Error: Could not find the element with ID.");
			}
			enemysprite.classList.remove("do-effect")
			void enemysprite.offsetWidth;
			enemysprite.classList.add("do-effect")
		}
	};
}


export class Player extends Unit {
	constructor(name, type, HP, OHP, MaxHP, evo, png, typepng, maxevo, strikeScaling, flashScaling, defScaling, evolutionChain, evoPosition) {
		super(name, type, HP, OHP, MaxHP);
		this.evo = 0;
		this.maxevo = maxevo;
		this.mana = 5;
		this.maxmana = 5;
		this.png = png;
		this.typepng = typepng;
		this.gold = 50;
		this.gameStatusList = [];
		this.relicList = [];
		this.strikeScaling = strikeScaling;
		this.flashScaling = flashScaling;
		this.defScaling = defScaling;
		this.evolutionChain = evolutionChain
		this.evoPosition = evoPosition
		this.evoMultiplier = 1

		this.typeBoost = []
		this.HBeamCheck = false;
		this.MaxKnuckleScaling = 0;
		this.isFly = false;
	}

	changeType(newtype) {
		this.type = [newtype]
	}

	levelUp(XP) {
		this.evo += (XP > 0 ? XP * this.evoMultiplier : 1);
		if (this.evo >= this.maxevo) this.evo = this.maxevo;

	}

	removeRelic(self, player) {
		if (player.relicList.includes(self)) {
			player.relicList.splice(player.relicList.indexOf(self), 1);
		}
	}

	relicCheck(relic, player, target, deck) {
		switch (relic) {
			case "Leftovers":
				say(player.name, "ate Leftovers!")
				player.heal(player.MaxHP / 20)
				break;
			case "Sitrus Berry":
				say(player.name, "ate Sitrus Berry!")
				player.heal(player.MaxHP / 10)
				break;
			case "Eviolite":
				if (player.evoPosition < player.evolutionChain.length) {
					player.mana++
				} else {
					player.maxmana = player.maxmana
				}
				break;
			case "Cheri Berry":
				if (player.boosts.find((arr) => arr.includes("paralyze"))) {
					let boost = player.boosts.find((arr) => arr.includes("paralyze"))
					if (boost) {
						player.boosts.splice(player.boosts.indexOf(boost), 1);
						say(player.name, "ate Cheri Berry!")
					}
				}
				break;
			case "Custap Berry":
				say(player.name, "ate Custap Berry!")
				if (player.HP <= player.MaxHP / 3) {
					deck.CustapBerryFreebie = true;
				}
				break;
			default:
				break;
		}
		if (this.isBerry == true) {
			this.removeRelic(relic, player)
		}
	}

	periodicRelicCheck(player, target, deck) {
		console.log(this.relicList, player.relicList)
		player.relicList.forEach((relic) => {
			console.log(relic)
			this.relicCheck(relic, player, target, deck)
		})
	}

	eventBoost(stat, value) {
		this[stat] += value;
	}

	hardReset() {
		this.reset()
		this.HP = this.MaxHP
		this.evo = 0
		console.log("reset the player")
	}

	reset() {
		this.OHP = 0
		this.mana = this.maxmana
		this.signedSTR = 0;
		this.boosts = [];
		this.DOTval = 0;
		this.BURNval = 0;
		this.HBeamCheck = false;
		this.MaxKnuckleScaling = 0;
		this.isFly = false;
		this.thorns = 0
		this.typeBoost = []
		console.log("soft reset the player")
	}

	pokeCenterHeal() {
		let heal = (this.MaxHP * (getRandomNumber(30, 60) / 100))
		this.heal(heal)
		this.damageHealed += heal
		this.reset()
		console.log("soft reset the player")
	}

	get vals() {
		return [this.name, this.type, this.HP, this.MaxHP, this.OHP, this.MaxOHP];
	}
}

export class Enem extends Unit {
	constructor(name = "mankey", type, HP, OHP, MaxHP, movelist, ult, captureCard = (new Card("", "potion", 20, 2, "item"))) {
		super(name, type, HP, OHP, MaxHP);
		this.png = (`https://img.pokemondb.net/sprites/black-white/normal/${this.name.toLowerCase()}.png` ? `https://img.pokemondb.net/sprites/black-white/normal/${this.name.toLowerCase()}.png` : `https://img.pokemondb.net/sprites/ruby-sapphire/normal/${this.name.toLowerCase()}.png`)
		this.movelist = movelist;
		this.ult = ult;
		this.startingMove = (this.movelist && this.movelist.length > 0)
			? this.formulateRetaliate()
			: null;
		this.captureCard = captureCard

		this.internalTurnCount = 1
	}

	thorn_check(trigger, target, self) {
		if (trigger == "thorn_trigger" && target.thorns > 0) {
			say(self.name, "was countered!")
			self.take(target.thorns)
		}
	}

	formulateRetaliate() {
		let rand = Math.floor(getRandomNumber(0, this.movelist.length));
		return this.movelist[rand]
	}

	retaliate(target) {
		const useUltimate = (this.internalTurnCount % 4 == 0 || this.internalTurnCount == 1) && this.ult;
		const selectedMove = useUltimate ? this.ult : this.startingMove;
		const enemyskill = Array.isArray(selectedMove) ? selectedMove[0] : selectedMove;
		if (!enemyskill) {
			console.error(`${this.name} has no enemy skill to use.`);
			return;
		}
		this.doMove(enemyskill, target);
		if (useUltimate) console.log("ult used");
		this.startingMove = this.formulateRetaliate()
		this.internalTurnCount++
	}

	doMove(enemyskill, target) {
		console.log("enemskill isFinite", enemyskill)
		const value = this.boosts.find((arr) => arr.includes("weakness"))
			? enemyskill.value * 0.75
			: enemyskill.value;
		if (this.boosts.find((arr) => arr.includes("paralyze")) && (getRandomNumber(1, 10) >= 8)) {
			say(this.name, "is paralyzed and can't act!");
		} else if (this.boosts.find((arr) => arr.includes("frozen")) && (getRandomNumber(1, 10) >= 9)) {
			say(this.name, "is frozen solid and can't act!")
		} else {

			console.log("actually played enemskill 2nd time", enemyskill)

			for (let i = 0; i < enemyskill.hitCount; i++) {
				console.log("im running mad genuinely", enemyskill.type, "looop counter=", i)
				if (this.boosts.find((arr) => arr.includes("burn"))) {
					say(this.name, "is burning!");
					this.take(this.MaxHP / 40)
				}
				enemyskill.type.forEach((type) => {
					switch (type) {
						case "strike":
							this.thorn_check(target.take(value, this.type[0]), target, this);
							break;
						case "shield":
							this.OSheal(value, this.type[0]);
							break;
						case "heal":
							this.heal(value, this.type[0]);
							break;
						case "buffstr":
							this.signedSTR += value
							break;
						default:
							console.log("ability");
							break;
					}
				})
			}



			if (enemyskill.effects) {
				enemyskill.effects.forEach((effect) => {
					if (enemyskill.effectstarget == "self") {
						statusEffectsPush(this.boosts, effect)
					} else {
						statusEffectsPush(target.boosts, effect)
					}
				})

			}

		}
		if (this.boosts.find((arr) => arr.includes("poison"))) {
			let poisonSum = this.boosts.find((arr) => arr.includes("poison"))[1]
			console.log("poison sum is, ", poisonSum)
			// if (poisonSum > 10) { poisonSum = 10 }
			say(this.name, "is poisoned!");
			this.DOTval = ((this.MaxHP / 100)) * (poisonSum)
			this.take(this.DOTval);
		}
		this.gameState = "INTRODUCTION";
	}

	reset() {
		this.HP = this.MaxHP
		this.OHP = 0
		this.mana = this.maxmana
		this.evo = 0
		this.signedSTR = 0;
		this.boosts = [];
		this.DOTval = 0;
		this.BURNval = 0;
		this.focusBandSave = false
		console.log("reset the enemy")

	}

	get vals() {
		return [this.name, this.type, this.HP, this.MaxHP, this.OHP, this.MaxOHP, this.startingMove];
	}
}

export class EnemySkill {
	constructor(name, type, value, hitCount = 1, effects, effectstarget = "target") {
		this.name = name;
		this.type = type;
		//can be "strike", "shield" or "heal", is an array and each repetition causes multiple actions to occur
		this.value = value;
		this.hitCount = hitCount;
		this.effects = effects;
		this.effectstarget = effectstarget;
		//effectstarget is either self or target
	}


}

export function statusEffectsPush(statusArr, newEffect) {
	const existing = statusArr.find((item) => item.includes(newEffect[0]));
	if (((statusArr.find((item) => item.includes("barrier"))) || (statusArr.find((item) => item.includes("fairy2buff")))) && (newEffect[0] != "barrier" && newEffect[0] != "fortress")) {
		return;
	};
	if (existing) {
		if (statusArr.find((item) => item.includes("poison"))) {
			if (existing[1] >= 50) {
				return
			}
		}
		existing[1] += newEffect[1];
	} else {
		statusArr.push([...newEffect]);
		say("Target has received", newEffect[0].toUpperCase())
	}
}

function statusEffectsSpend(statusArr, statusEffectToBeRemoved, amountToRemove) {
	const status = statusArr.find((item) => item.includes(statusEffectToBeRemoved));
	if (status) {
		status[1] -= amountToRemove;
		if (status[1] <= 0) {
			statusArr.splice(statusArr.indexOf(status), 1);
		}
	}
}

function triggerStatusEffect(statusArr, statusEffectToBeTriggered) {
	const status = statusArr.find((item) => item.includes(statusEffectToBeTriggered));
	if (status) {
		let ret = status[1]
		statusEffectsSpend(statusArr, statusEffectToBeTriggered, ret)
		return ret
	}
	return 1

}

function addThorns(statusArr, target, amount) {
	const status = statusArr.find((item) => item.includes("thorns"));
	statusEffectsPush(target.boosts, ["thorns", Math.round(amount)])
	target.thorns += Math.round(amount)

}

function itemCheck(self, target, type, skill, value, defvalue, deck) {
	switch (skill) {
		case "potion":
			self.heal(value, type);
			break;
		case "superpotion":
			self.heal(value, type);
			break;
		case "fullrestore":
			self.heal(self.MaxHP, type);
			break;
		case "elixir":
			self.mana += 3;
			break;
		case "expcandy":
			self.evo += 25;
			break;
		case "energyroot":
			self.take(self.MaxHP / 10);
			self.mana += 3;
			break;
		case "iron":
			self.OSheal(value, type)
			break;
		case "pokeball":
			if (capture(deck, target, 20)) {
				target.HP = 0;
			};
			break;
		case "ultraball":
			if (capture(deck, target, 60)) {
				target.HP = 0;
			};
			break;
		case "masterball":
			if (capture(deck, target, 100)) {
				target.HP = 0;
			};
			break;
	}
}

export function cardGenerator(type) {
	//create criteria for generating card types, making each one distinct
	switch (type) {
		case "potion":
			return (new Card("", "potion", 20, 0, "item"))
			break;
		case "superpotion":
			return (new Card("", "superpotion", 50, 0, "item"))
			break;
		case "fullrestore":
			return (new Card("", "fullrestore", 200, 0, "item"))
			break;
		case "elixir":
			return (new Card("", "elixir", 200, 0, "item"))
			break;
		case "expcandy":
			return (new Card("", "expcandy", 200, 0, "item"))
			break;
		case "energyroot":
			return (new Card("", "energyroot", 100, 0, "item"))
			break;
		case "iron":
			return (new Card("", "iron", 150, 0, "item"))
			break;
		case "pokeball":
			return new Card("", "pokeball", 20, 5, "item")
			break;
		case "ultraball":
			return new Card("", "ultraball", 100, 5, "item")
			break;
		case "masterball":
			return new Card("", "masterball", 200, 5, "item")
			break;
		case "normal":
			return (new Card("normal", "normal", 25, 2, "move"))
			break;
		case "normal2":
			return (new Card("normal", "normal2", 25, 4, "move"))
			break;
		case "normal3":
			return (new Card("normal", "normal3", 25, 3, "move"))
			break;
		case "normal4":
			return (new Card("normal", "normal4", 25, 1, "move"))
			break;
		case "normal5":
			return (new Card("normal", "normal5", 25, 0, "move"))
			break;
		case "normal6":
			return (new Card("normal", "normal6", 25, 0, "move", false, true, false, false, true))
			break;
		case "normal7":
			return (new Card("normal", "normal7", 25, 0, "move"))
			break;
		case "normal8":
			return (new Card("normal", "normal8", 25, 1, "move"))
			break;
		case "fire":
			return (new Card("fire", "fire", 25, 2, "move"))
			break;
		case "fire2":
			return (new Card("fire", "fire2", 25, 2, "move"))
			break;
		case "fire3":
			return (new Card("fire", "fire3", 25, 3, "move", false, false, true))
			break;
		case "water":
			return (new Card("water", "water", 25, 2, "move"))
			break;
		case "water2":
			return (new Card("water", "water2", 25, 1, "move"))
			break;
		case "water3":
			return (new Card("water", "water3", 25, 3, "move"))
			break;
		case "grass":
			return (new Card("grass", "grass", 25, 2, "move"))
			break;
		case "grass2":
			return (new Card("grass", "grass2", 25, 2, "move", false, false, true, false))
			break;
		case "grass3":
			return (new Card("grass", "grass3", 25, 2, "move"))
			break;
		case "grass4":
			return (new Card("grass", "grass4", 25, 3, "move", false, true))
			break;
		case "flying":
			return (new Card("flying", "flying", 25, 2, "move"))
			break;
		case "flying2":
			return (new Card("flying", "flying2", 25, 3, "move", false, true))
			break;
		case "flying3":
			return (new Card("flying", "flying3", 25, 3, "move", false, true))
			break;
		case "electric":
			return (new Card("electric", "electric", 25, 2, "move"))
			break;
		case "electric2":
			return (new Card("electric", "electric2", 25, 3, "move"))
			break;
		case "electric3":
			return (new Card("electric", "electric3", 25, 2, "move"))
			break;
		case "ground":
			return (new Card("ground", "ground", 25, 2, "move"))
			break;
		case "ground2":
			return (new Card("ground", "ground2", 25, 1, "move"))
			break;
		case "ground3":
			return (new Card("ground", "ground3", 25, 2, "move"))
			break;
		case "psychic":
			return (new Card("psychic", "psychic", 25, 2, "move"))
			break;
		case "psychic2":
			return (new Card("psychic", "psychic2", 25, 1, "move", false, false, true, false))
			break;
		case "psychic3":
			return (new Card("psychic", "psychic3", 25, 1, "move"))
			break;
		case "rock":
			return (new Card("rock", "rock", 25, 2, "move"))
			break;
		case "rock2":
			return (new Card("rock", "rock2", 25, 3, "move", false, false, false, true, false, getRandomNumber(1, 3)))
			break;
		case "rock3":
			return (new Card("rock", "rock3", 25, 2, "move"))
			break;
		case "ice":
			return (new Card("ice", "ice", 25, 2, "move"))
			break;
		case "ice2":
			return (new Card("ice", "ice2", 25, 1, "move"))
			break;
		case "ice3":
			return (new Card("ice", "ice3", 25, 3, "move"))
			break;
		case "dragon":
			return (new Card("dragon", "dragon", 25, 3, "move"))
			break;
		case "dragon2":
			return (new Card("dragon", "dragon2", 25, 4, "move"))
			break;
		case "dragon3":
			return (new Card("dragon", "dragon3", 25, 3, "move"))
			break;
		case "ghost":
			return (new Card("ghost", "ghost", 25, 2, "move"))
			break;
		case "ghost2":
			return (new Card("ghost", "ghost2", 25, 2, "move", false, false, true))
			break;
		case "ghost3":
			return (new Card("ghost", "ghost3", 25, 2, "move", false, true, true))
			break;
		case "steel":
			return (new Card("steel", "steel", 25, 2, "move"))
			break;
		case "steel2":
			return (new Card("steel", "steel2", 25, 3, "move"))
			break;
		case "steel3":
			return (new Card("steel", "steel3", 25, 3, "move"))
			break;
		case "fairy":
			return (new Card("fairy", "fairy", 25, 2, "move"))
			break;
		case "fairy2":
			return (new Card("fairy", "fairy2", 25, 3, "move"))
			break;
		case "fairy3":
			return (new Card("fairy", "fairy3", 25, 3, "move", true))
			break;
		case "bug":
			return (new Card("bug", "bug", 25, 1, "move"))
			break;
		case "bug2":
			return (new Card("bug", "bug2", 25, 1, "move", false, false, true))
			break;
		case "bug3":
			return (new Card("bug", "bug3", 25, 2, "move", false, false, true, true, false, getRandomNumber(2, 5)))
			break;
		case "fighting":
			return (new Card("fighting", "fighting", 25, 2, "move"))
			break;
		case "fighting2":
			return (new Card("fighting", "fighting2", 25, 3, "move"))
			break;
		case "fighting3":
			return (new Card("fighting", "fighting3", 25, 2, "move"))
			break;
		case "poison":
			return (new Card("poison", "poison", 25, 2, "move"))
			break;
		case "poison2":
			return (new Card("poison", "poison2", 25, 4, "move"))
			break;
		case "poison3":
			return (new Card("poison", "poison3", 25, 3, "move"))
			break;
		case "dark":
			return (new Card("dark", "dark", 25, 2, "move"))
			break;
		case "dark2":
			return (new Card("dark", "dark2", 25, 2, "move"))
			break;
		case "dark3":
			return (new Card("dark", "dark3", 25, 3, "move", false, false, true))
			break;
		case "shadow":
			return (new Card("shadow", "shadow", 25, 3, "move"))
		case "shadow2":
			return (new Card("shadow", "shadow2", 25, 4, "move"))
		case "shadow3":
			return (new Card("shadow", "shadow3", 25, 4, "move", false, false, true, false, false, 1, false, true))
		case "posse":
			return (new Card("psychic", "posse", 0, 50, "move"))
		case "posse2":
			return (new Card("normal", "posse2", 0, 50, "move"))
		case "posse3":
			return (new Card("normal", "posse3", 0, 100, "move"))
		case "tracked":
			return (new Card("", "tracked", -50, 2, "move", false, false, false, false, false, 1, false, true))
		case "growing_pains":
			return (new Card("", "growing_pains", 10, 3, "move"))
			break
		case "mysterious_egg":
			return (new Card("", "mysterious_egg", 10, 0, "move", false, false, false, false, false, 1, true))
			break
		case "ancientpower":
			return (new Card("", "ancientpower", 10, 3, "move", false, false, true))
			break
	}
}

export function skillNametoMoveName(name) {
	switch (name) {
		case "strike":
			return `Strike`;
			break;
		case "shield":
			return `Defend`;
			break;
		case "potion":
			return `Potion`;
			break;
		case "superpotion":
			return `Super Potion`
			break;
		case "fullrestore":
			return `Full Restore`
			break;
		case "elixir":
			return `Elixir`
			break;
		case "expcandy":
			return `Exp Candy`
			break;
		case "energyroot":
			return `Energy Root`
			break;
		case "iron":
			return `Iron`
			break;
		case "pokeball":
			return `PokeBall`
			break;
		case "ultraball":
			return `Ultra Ball`
			break;
		case "masterball":
			return `Master Ball`
			break;
		case "flash":
			return `Hidden Power`;
			break;
		case "heal":
			return `Slack Off`;
			break;
		case "normal":
			return `Tackle`;
			break;
		case "normal2":
			return `Hyper Beam`;
			break;
		case "normal3":
			return `Protect`;
			break;
		case "normal4":
			return `Explode`
			break;
		case "normal5":
			return `Baton Pass`
			break;
		case "normal6":
			return `Sketch`
			break;
		case "normal7":
			return `Struggle`
			break;
		case "normal8":
			return `Secret Power`
			break;
		case "fire":
			return `Flamethrower`;
			break;
		case "fire2":
			return `Will-O-Wisp`;
			break;
		case "fire3":
			return `Sacred Fire`;
			break;
		case "water":
			return `Surf`;
			break;
		case "water2":
			return `Rain Dance`;
			break;
		case "water3":
			return `Water Spout`;
			break;
		case "grass":
			return `Leaf Blade`;
			break;
		case "grass2":
			return `Magical Leaf`;
			break;
		case "grass3":
			return `Mega Drain`;
			break;
		case "grass4":
			return `Giga Drain`;
			break;
		case "flying":
			return `Brave Bird`;
			break;
		case "flying2":
			return `Fly`;
			break;
		case "flying3":
			return `Roost`;
			break;
		case "electric":
			return `Thunderbolt`;
			break;
		case "electric2":
			return `Volt Tackle`;
			break;
		case "electric3":
			return `Charge`
			break;
		case "ground":
			return `Earthquake`;
			break;
		case "ground2":
			return `Spikes`;
			break;
		case "ground3":
			return `Magnitude`;
			break;
		case "psychic":
			return `Psychic`;
			break;
		case "psychic2":
			return `Future Sight`;
			break;
		case "psychic3":
			return `Psycho-Shift`;
			break;
		case "rock":
			return `Stone Edge`;
			break;
		case "rock2":
			return `Rollout`;
			break;
		case "rock3":
			return `Stealth Rock`;
			break;
		case "ice":
			return `Ice Beam`;
			break;
		case "ice2":
			return `Aurora Beam`
			break;
		case "ice3":
			return `Hailstorm`
			break;
		case "dragon":
			return `Draco Meteor`;
			break;
		case "dragon2":
			return `Spacial Rend`;
			break;
		case "dragon3":
			return `Dragon Dance`;
			break;
		case "ghost":
			return `Shadow Ball`;
			break;
		case "ghost2":
			return `Curse`;
			break;
		case "ghost3":
			return `Phantom Force`;
			break;
		case "steel":
			return `Iron Tail`;
			break;
		case "steel2":
			return `Heavy Slam`;
			break;
		case "steel3":
			return `Bullet Punch`;
			break;
		case "fairy":
			return `Moonblast`;
			break;
		case "fairy2":
			return `Misty Terrain`;
			break;
		case "fairy3":
			return `Dazzling Gleam`;
			break;
		case "bug":
			return `Harden`;
			break;
		case "bug2":
			return `X-Scissor`;
			break;
		case "bug3":
			return `Fury Cutter`;
			break;
		case "fighting":
			return `Close Combat`;
			break;
		case "fighting2":
			return `Max Knuckle`;
			break;
		case "fighting3":
			return `Reversal`;
			break;
		case "poison":
			return `Toxic`;
			break;
		case "poison2":
			return `Smog`;
			break;
		case "poison3":
			return `Gastro Acid`;
			break;
		case "dark":
			return `Crunch`;
			break;
		case "dark2":
			return `Night Slash`;
			break;
		case "dark3":
			return `Sucker Punch`;
			break;
		case "shadow":
			return `Shadow Rush`
		case "shadow2":
			return `Shadow End`
		case "shadow3":
			return `Shadow Half`
		case "posse":
			return `Trick Room`
		case "posse2":
			return `U-Turn`
		case "posse3":
			return `Fakeout`
		case "tracked":
			return `Eyes of the Law`
		case "growing_pains":
			return `Growing Pains`;
			break;
		case "mysterious_egg":
			return `Mysterious Egg`;
			break;
		case "ancientpower":
			return `Ancient Power`;
			return
		default:
			return ``;
			break;
	}
}

function cardDescription(type, value, defValue) {
	value = Math.round(value)
	defValue = Math.round(defValue)
	switch (type) {
		case "potion":
			return `Heals self for ${value}.`;
		case "superpotion":
			return `Heals self for ${value}.`;
		case "fullrestore":
			return `Heals self to full HP`
		case "elixir":
			return `Restores 3 PokePoints`
		case "expcandy":
			return `Gain 25 Evo Points.`
		case "energyroot":
			return `Spend 10% Max HP and restore 3 PokePoints`
		case "iron":
			return `Iron`
		case "pokeball":
			return `Chance to capture any enemy with under 50% HP.`;
		case "ultraball":
			return `Chance to capture any enemy with under 50% HP.`;
		case "masterball":
			return `Guaranteed to capture any enemy with under 50% HP.`;
		case "strike":
			return `Deals ${value} damage to target.`;
		case "shield":
			return `Grants ${defValue} shield to self.`;
		case "flash":
			return `Deals ${value} damage to target.`;
		case "heal":
			return `Heals ${defValue} to self.`;
		case "normal":
			return `Deals ${value} damage to target. Generate ${defValue * 2} shield.`;
		case "normal2":
			return `Deals ${Math.round(5 * value)} damage to target. Can't act for subsequent turn.`
		case "normal3":
			return `Grants 1 Barrier.`
		case "normal4":
			return `Go ahead.`
		case "normal5":
			return `Discard a random card, draw 1 card and gain 1 Pokepoint.`
		case "normal6":
			return `Plays the enemy's capture card.`
		case "normal7":
			return `An attack used in desperation. Costs 5% HP to deal ${Math.round(value)}`
		case "normal8":
			return `An attack that may have an additional effect that varies with the weather.`
		case "fire":
			return `Deals ${Math.round(2.5 * value)} damage to target.`;
		case "fire2":
			return `Apply 3 Burn to target. Amount doubled if it is sunny.`;
		case "fire3":
			return `Deals ${Math.round(3 * value)}. Apply 2 Burn to target and self. No self-burn if it is sunny. Pierces.`;
		case "water":
			return `Deals ${Math.round(2.5 * value)} damage to target.`;
		case "water2":
			return `Doubles the power of the next water-type move. If it is raining, playing this card is free.`;
		case "water3":
			return `Deals ${Math.round(value * 2.5)} base damage to target. Up to 100% more damage the higher your HP, and up to 200% if it is raining.`;
		case "grass":
			return `Deals ${Math.round(2.5 * value)} damage to target.`;
		case "grass2":
			return `Deals ${Math.round(2 * value)} damage to target. Pierces.`;
		case "grass3":
			return `Deals ${Math.round(1 * value)} damage to target. Heals for ${defValue}.`;
		case "grass4":
			return `Deals ${Math.round(2 * value)} damage to target. Heals for ${defValue * 2.5}. Limited.`;
		case "bug":
			return `Generate ${Math.round(defValue * 1.5)} shield. Grants 15 Evolution Points`;
		case "bug2":
			return `Attempt to spend 10 Evolution Points and Deal ${Math.round(2.5 * value)} damage. Otherwise, gain 20 Evolution Points. Pierces.`;
		case "bug3":
			return `Attempt to attack up to 5 times, dealing ${Math.round(value)} each time and gaining 5 Evolutionn Points per hit.`
		case "flying":
			return `Deal ${Math.round(3 * value)} damage, taking 10% recoil damage.`
		case "flying2":
			return `Deal ${Math.round(value)} damage, and gain 2 Barrier. Limited.`
		case "flying3":
			return `Heal for 33% Maximum HP. Limited`
		case "electric":
			return `Deals ${Math.round(value)} damage to target. Apply 2 Paralyze`;
		case "electric2":
			return `Deals ${Math.round(3 * value)} damage to target, taking 10% recoil damage`;
		case "electric3":
			return `Doubles the power of the next electric-type move. If it is foggy, playing this card is free.`;
		case "ground":
			return `Deals ${Math.round(2.5 * value)} damage to target.`;
		case "ground2":
			return `Gain ${Math.round(value / 3)} thorns.`;
		case "ground3":
			return `Gain ${defValue * 2} Shields. Deal a high variable amount of damage.`;
		case "psychic":
			return `Deals ${Math.round(value / 2)} damage to target. Apply 1 Vulnerable`;
		case "psychic2":
			return `Gain ${defValue * 2} Shield. \n Discard: Foresees an attack a turn later. Deals ${Math.round(2.5 * value)} damage to target.`;
		case "psychic3":
			return `Apply all status effects to the enemy.`;
		case "rock":
			return `Deals ${Math.round(2 * value)} damage to target. Generate ${Math.round(defValue * 2)} shield.`;
		case "rock2":
			return `Deals ${Math.round(value)} base damage to target up to 3 times. Every point of shield adds to damage value.`;
		case "rock3":
			return `Gain ${Math.round(defValue * 1.5)} Shield and ${value / 2} thorns.`;
		case "ice":
			return `Deals ${Math.round(1.5 * value)} damage to target. Apply 1 Frozen`;
		case "ice2":
			return `Deals ${Math.round(value)} damage to target. Apply 2 Weakness. \n Discard: Gain ${Math.round(2 * defValue)} Shield`;
		case "ice3":
			return `Deals ${Math.round(2 * value)} damage to target. If in hail, damage is doubled. Apply 2 Frozen`;
		case "dragon":
			return `Deals ${Math.round(2.5 * value)} damage to target. Apply 2 Weakness`;
		case "dragon2":
			return `Deals ${Math.round(2.5 * value)} damage to target. High chance to crit for devastating damage.`;
		case "dragon3":
			return `Gain 15 Strength and 2 Pokepoints. Limited`;
		case "steel":
			return `Deals ${Math.round(value)} damage to target. Apply 2 Fortress`;
		case "steel2":
			return `Deals ${Math.round(2 * value)} damage to target and gains ${Math.round(value * 2)} shield. Up to 100% increase in damage the higher your HP and vice-versa for shield.`;
		case "steel3":
			return `Deals ${Math.round(3 * value)} damage. Gain ${Math.round(value)} Shields. Costs 0 points if first card played in a turn.`
		case "ghost":
			return `Deals ${Math.round(1.5 * value)} damage to target. Apply 2 Vulnerable`;
		case "ghost2":
			return `Sacrifice 15% HP. Deals ${Math.round(3 * value)} damage to target. Apply 1 Vulnerable & Weakness to self.`;
		case "ghost3":
			return `Sacrifice 15% HP. Gain 2 Barrier. Deal ${Math.round(4 * value)} damage. Pierces. Limited.`;
		case "fighting":
			return `Deals ${Math.round(2 * value)} damage to target. Gain 10 temporary STR.`;
		case "fighting2":
			return `Deals ${Math.round(2 * value)} damage to target. Gain 5 temporary STR for every time this card has been played.`;
		case "fighting3":
			return `Deals ${Math.round(1.5 * value)} base damage to target. Up to 200% more damage the lower your HP.`;
		case "dark":
			return `Deals ${Math.round(value)} damage to target. Deal 2 Vulnerable`;
		case "dark2":
			return `Discard up to 2 random cards from your hand. Deals ${Math.round(1.5 * value)} damage for each.`;
		case "dark3":
			return `Deals ${Math.round(3.5 * value)} damage. Pierces. Costs 0 points if first card played in a turn but deals 70% less damage.`;
		case "poison":
			return `Deals ${Math.round(value)} damage to target. Deal 6 Poison`;
		case "poison2":
			return `Double enemy's current Poison value.`
		case "poison3":
			return `Trigger poison for ${Math.round(value / 4)} per stack. Apply 1 Vulnerable & 1 Weakness.`
		case "fairy":
			return `Deals ${Math.round(2 * value)} damage to target. Gain 10 temporary STR if it's windy`;
		case "fairy2":
			return `Negates incoming status effects for 1 turn. Boost the power of the next Fairy-type attack. Played for free if weather is foggy. `;
		case "fairy3":
			return `Deals ${Math.round(value)} base damage to target, increasing with each point spent. Applies 3 Weakness.`
		case "shadow":
			return `Deals ${Math.round(value * 3)} damage, take 10% Max HP Recoil damage.`
		case "shadow2":
			return `Deals ${Math.round(value * 6)} damage. Lose 50% of Current HP. Pierces.`
		case "shadow3":
			return `Halves enemy HP. Fleeting.`
		case "posse":
			return `Gain 3 Pokepoints.`
		case "posse2":
			return `Shuffle all cards in hand into discard pile and draw 5`
		case "posse3":
			return `Flinch opponent for one turn.`
		case "tracked":
			return `\n Discard: Applies Weakness and Vulnerable to self for 2 turns.`
		case "growing_pains":
			return `When this card is drawn, lose 1 PokePoint. Can be played to gain 5 permanent strength.`
		case "mysterious_egg":
			return `It's a mysterious egg... You can sense its potential. Unplayable.`
		case "ancientpower":
			return `An attack with a prehistoric power dealing ${Math.round(value * 3)}. Gain 2 Fortress, 10 Temp STR, 10 STR. `
		default:
			return `It's a card, alright.`;
	}
}

function skillCheck(self, target, deck, type, skill, value, defvalue, piercing, weather, card) {
	if (self.type.includes(type)) {
		console.log("SAME TYPE ATTACK BONUS")
		value *= 1.5
	}
	let initialHP = target.HP
	switch (skill) {
		case "ancientpower":
			target.take(value * 3, type, piercing);
			statusEffectsPush(self.boosts, ["fortress", 2]);
			self.tempSTR += 10;
			self.str += 10;
			break;
		case "normal":
			target.take(value * 1.5, type, piercing);
			self.OSheal(defvalue * 2, type);
			break;
		case "normal2":
			target.take(value * 5, type, piercing);
			self.HBeamCheck = true
			break;
		case "normal3":
			statusEffectsPush(self.boosts, ["barrier", 3]);
			break;
		case "normal4":
			target.take(value * 8, type, piercing);
			self.take(self.MaxHP);
			say(self.name, "blew themselves up!")
			break;
		case "normal5":
			if (deck.randomDiscard(target, self, deck, card) != "failed_discard") {
				deck.draw(1)
				self.mana += 1
			}
			break;
		case "normal6":
			target.captureCard.play(target, self, deck, weather)
			break;
		case "normal7":
			self.recoil(5)
			target.take(value, piercing)
			break;
		case "normal8":
			let secretType = "normal"
			switch (weather) {
				case "sunny":
					secretType = "fire"
					break;
				case "rainy":
					secretType = "water"
					break;
				case "windy":
					secretType = "electric"
					break;
				case "foggy":
					secretType = "fairy"
					break;
				case "hail":
					secretType = "ice"
					break;
				default:
					secretType = "normal"
					break;
			}
			say(self.name, "used a mysterious power.")
			cardGenerator(secretType).play(target, self, deck, weather)
			break;
		case "fire":
			target.take(value * 2.5, type, piercing);
			break;
		case "fire2":
			let fire2val = 3
			if (weather == "sunny") {
				fire2val = 6;
			}
			statusEffectsPush(target.boosts, ["burn", fire2val])
			break;
		case "fire3":
			target.take(value * 3, type, piercing)
			statusEffectsPush(target.boosts, ["burn", 2])
			if (weather != "sunny") {
				statusEffectsPush(self.boosts, ["burn", 2])
			}
			break;
		case "water":
			target.take(value * 2.5, type, piercing);
			break;
		case "water2":
			self.typeBoost = ["water", 2.5]
			break;
		case "water3":
			let HPperc = (self.HP / self.MaxHP) * 100
			let valMulPerc = (100 * (HPperc / 100))
			if (weather = "rainy") { valMulPerc * 2 }
			target.take(value * (2.5 + (1 * (valMulPerc / 100))), type, piercing);
			break;
		case "grass":
			target.take(value * 2.5, type, piercing);
			break;
		case "grass2":
			target.take(value * 2, type, piercing);
			break;
		case "grass3":
			target.take(value * 1, type, piercing);
			self.heal(defvalue);
			break;
		case "grass4":
			target.take(value * 2, type, piercing);
			self.heal(defvalue * 2.5);
			break;
		case "bug":
			self.OSheal(defvalue, type);
			self.evo += 15;
			break;
		case "bug2":
			if (self.evo >= 10) {
				self.evo -= 10
				target.take(2.5 * value, piercing)
			} else {
				self.evo += 20;
			}
			break;
		case "bug3":
			target.take(valu, piercing)
			self.evo += 5
			break;
		case "flying":
			target.take(value * 3, type, piercing);
			self.recoil(10)
			break;
		case "flying2":
			target.take(value, type, piercing);
			statusEffectsPush(self.boosts, ["barrier", 2])
			break;
		case "flying3":
			self.heal(self.MaxHP / 3)
			break;
		case "electric":
			target.take(value, type, piercing);
			statusEffectsPush(target.boosts, ["paralyze", 2]);
			break;
		case "electric2":
			target.take(value * 3, type, piercing);
			self.recoil(10)
			break;
		case "electric3":
			self.typeBoost = ["electric", 2.5]
			break;
		case "ground":
			target.take(value * 2.5, type, piercing)
			break;
		case "ground2":
			addThorns(self.boosts, self, value / 3)
			break;
		case "ground3":
			let mag = getRandomNumber(4, 10)
			self.OSheal(defvalue * 2);
			say("", `Magnitude ${mag}!`)
			target.take(value * (mag / 2.5, piercing))
			break;
		case "psychic":
			target.take(value / 2, type, piercing)
			statusEffectsPush(target.boosts, ["vulnerable", 1]);
			break;
		case "psychic2":
			self.OSheal(defvalue * 2)
			break;
		// if (!target.boosts.find((arr) => arr.includes("future_sight"))) {
		// 	target.FSval = value * 2
		// 	statusEffectsPush(target.boosts, ["future_sight", 1])
		// 	say(this.name, "foresees an attack!")
		// } else {
		// 	say("", "An attack has already been foreseen...")
		// }
		case "psychic3":
			self.boosts.forEach(status => {
				statusEffectsPush(target.boosts, status)
			});
			self.boosts = []
			break;
		case "rock":
			target.take(value * 2, type, piercing)
			self.OSheal(value * 2, type);
			break;
		case "rock2":
			target.take(value + self.OHP, type, piercing)
			break;
		case "rock3":
			self.OSheal(value * 1.5, type);
			addThorns(self.boosts, self, value / 2)
			break;
		case "ice":
			target.take(value * 1.5, type, piercing)
			statusEffectsPush(target.boosts, ["frozen", 1]);
			break;
		case "ice2":
			target.take(value, type, piercing)
			statusEffectsPush(target.boosts, ["weakness", 2]);
			break;
		case "ice3":
			let mul = (weather == "hail" ? 4 : 2)
			target.take(value * mul, piercing);
			if (weather == "hail") { statusEffectsPush(target.boosts, ["frozen", 2]) }
			break;
		case "dragon":
			target.take(value * 2.5, type, piercing)
			statusEffectsPush(target.boosts, ["weakness", 2]);
			break;
		case "dragon2":
			let spacial_rend_mul = getRandomNumber(5, 12)
			if (spacial_rend_mul > 6) { say(self.name, "tears the foe along with the space around it!") }
			target.take(value * (spacial_rend_mul / 2), type, piercing)
			break;
		case "dragon3":
			self.signedSTR += 15;
			self.mana += 2;
			break;
		case "ghost":
			target.take(value * 1.5, type, piercing);
			statusEffectsPush(target.boosts, ["vulnerable", 1]);
			break;
		case "ghost2":
			target.take(value * 3, type, piercing);
			self.recoil(15)
			statusEffectsPush(self.boosts, ["vulnerable", 1]);
			statusEffectsPush(self.boosts, ["weakness", 1]);
			break;
		case "ghost3":
			self.recoil(15)
			target.take(value * 4, type, piercing);
			statusEffectsPush(self.boosts, ["barrier", 2])
			break;
		case "steel":
			target.take(value, type, piercing);
			statusEffectsPush(self.boosts, ["fortress", 2]);
			break;
		case "steel2":
			let steel2dmgmul = (150 * (((self.MaxHP - self.HP / self.MaxHP) * 100) / 100) / 100)
			target.take(value * (2 + (2 * (steel2dmgmul ? steel2dmgmul != 0 : 1))), type, piercing);
			let steel2shdmul = (100 * (self.HP / self.MaxHP))
			self.OSheal(defvalue * (2 + (2 * (steel2shdmul / 100))))
			break;
		case "steel3":
			target.take(3 * value, type, piercing)
			self.OSheal(value)
			break;
		case "fairy":
			target.take(value * 2, type, piercing);
			if (weather == "windy") { self.tempSTR += 10; }
			break;
		case "fairy2":
			statusEffectsPush(self.boosts, ["fairy2buff", 2])
			self.typeBoost = ["fairy", 2]
			break;
		case "fairy3":
			target.take(value, piercing);
			statusEffectsPush(target.boosts, ["weakness", 3])
			break;
		case "fighting":
			target.take(value * 2, type, piercing);
			self.tempSTR += 10;
			break;
		case "fighting2":
			target.take(value * 2, type, piercing);
			self.tempSTR += (5 + (5 * self.MaxKnuckleScaling));
			self.MaxKnuckleScaling < 5 ? self.MaxKnuckleScaling += 1 : 15;
			break;
		case "fighting3":
			let HPdiff = (self.MaxHP - self.HP / self.MaxHP) * 100
			let valMul = (150 * (HPdiff / 100) / 100)
			target.take(value * (2 + (2 * (valMul ? valMul != 0 : 1))), type, piercing);
			break;
		case "dark":
			target.take(value, type, piercing);
			statusEffectsPush(target.boosts, ["vulnerable", 1]);
			break;
		case "dark2":
			for (let i = 0; i < 2; i++) {
				if (deck.randomDiscard(target, self, deck, card) != "failed_discard") {
					target.take(value * 1.5, type, piercing);
				}
			}
			break;
		case "dark3":
			if (deck.firstCardPlayed == true) {
				target.take(3.5 * value, type, piercing)
			} else {
				target.take(1.5 * value, type, piercing)
			}
			break;
		case "shadow":
			target.take(value * 3, type, piercing);
			self.recoil(10)
			break;
		case "shadow2":
			target.take(value * 6, type, piercing);
			self.recoil(50, true)
			break;
		case "shadow3":
			target.take(target.HP / 2, type, piercing, true);
			break;
		case "poison":
			target.take(value, type, piercing);
			statusEffectsPush(target.boosts, ["poison", 6]);
			break;
		case "poison2":
			if (target.boosts.find((arr) => arr.includes("poison"))) {
				target.boosts.find((arr) => arr.includes("poison"))[1] *= 2
			}
			break;
		case "poison3":
			statusEffectsPush(target.boosts, ["vulnerable", 1])
			statusEffectsPush(target.boosts, ["weakness", 1])
			target.take((value / 4) * triggerStatusEffect(target.boosts, "poison", piercing))
			break;
		case "posse":
			break;
		case "posse2":
			break;
		case "posse3":
			break;
		case "growing_pains":
			self.signedSTR += 5;
			break;
		case "mysterious_egg":
			break;

	}
	if (target.HP < initialHP) { return "thorn_trigger" }
}

function discardSkillCheck(self, target, deck, type, skill, value, defvalue, piercing, weather) {
	if (self.type.includes(type)) {
		console.log("SAME TYPE ATTACK BONUS")
		value *= 1.5
	}
	console.log("DISCARD ABILITY HAS BEEN ACTIVATED")
	let initialHP = target.HP
	switch (skill) {
		case "ice2":
			self.OSheal(defvalue * 2, type, piercing);
			break;
		case "psychic2":
			target.take(value * 2.5, type, piercing);
			say(self.name, "foresees an attack!")
			break;
		case "tracked":
			statusEffectsPush(self.boosts, ["vulnerable", 2])
			statusEffectsPush(self.boosts, ["weakness", 2])
			break;
		default:
			break;
	}
	if (target.HP < initialHP) { return "thorn_trigger" }
}

export let player = new Player(
	"Ryu",
	["normal", "water"],
	45,
	10,
	45,
	0,
	100,
	6,
	6,
);

export function GameStart(player, enem, deck, weather = "clear") {
	game.player = player
	game.enem = enem
	game.deck = deck
	game.gameState = "INTRODUCTION"
	game.weather = weather
	deck.createHand()
	console.log("game start function entered?")
}
