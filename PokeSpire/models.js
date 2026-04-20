//type adv [X]
//elements cards (X)
//implement STR mechnic (X)
//add poison and blind (X)
//item cards like tcg(X)
//capture mechanic
//ability to see enemy nxt move
//STAB???
//game over
//save deck/status in local.storage

//weakness, vulnerable, exalted,(X)
//poison, paralyze on cards [limited draw?]()
//burn on card use
//weather on map node

//victory reward scr
//map
//intro and select screen
// shop
//local storage

document.addEventListener("DOMContentLoaded", () => {
	let output = document.getElementById("output");
	if (!output) {
		console.error("Error: Could not find the element with ID.");
	}
});

const getRandomNumber = (min, max) => {
	return Math.random() * (max - min) + min;
};

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function typeCheck(atkType, defType) {
	//function that takes two pokemon types and returns an appropriate scaling value and proper message
	//if poke has two types itll do it twice then add the values
	let returnVal = 1;
	const dataset = {
		normal: {
			half: ["rock", "steel"],
			double: [],
			null: ["ghost"],
		},
		fighting: {
			half: ["flying", "poison", "bug", "psychic", "fairy"],
			double: ["normal", "rock", "steel", "ice", "dark"],
			null: ["ghost"],
		},
		flying: {
			half: ["rock", "steel", "electric"],
			double: ["fighting", "bug", "grass"],
			null: [],
		},
		poison: {
			half: ["poison", "rock", "ground", "ghost"],
			double: ["grass", "fairy"],
			null: ["steel"],
		},
		ground: {
			half: ["bug", "grass"],
			double: ["poison", "rock", "steel", "fire", "electric"],
			null: ["flying"],
		},
		rock: {
			half: ["fighting", "ground", "steel"],
			double: ["flying", "rock", "fire", "ice"],
			null: [],
		},
		bug: {
			half: ["fighting", "flying", "poison", "ghost", "steel", "fire", "fairy"],
			double: ["grass", "psychic", "dark"],
			null: [],
		},
		ghost: {
			half: ["dark"],
			double: ["ghost", "psychic"],
			null: ["normal"],
		},
		steel: {
			half: ["steel", "fire", "water", "electric"],
			double: ["rock", "ice", "fairy"],
			null: [],
		},
		fire: {
			half: ["rock", "fire", "water", "dragon"],
			double: ["bug", "steel", "grass", "ice"],
			null: [],
		},
		water: {
			half: ["water", "grass", "dragon"],
			double: ["ground", "rock", "fire"],
			null: [],
		},
		grass: {
			half: ["flying", "poison", "bug", "steel", "fire", "grass", "dragon"],
			double: ["ground", "rock", "water"],
			null: [],
		},

		electric: {
			half: ["grass", "electric", "dragon"],
			double: ["flying", "water"],
			null: ["ground"],
		},
		psychic: {
			half: ["steel", "psychic"],
			double: ["fighting", "poison"],
			null: ["dark"],
		},
		ice: {
			half: ["steel", "fire", "water", "psychic"],
			double: ["flying", "ground"],
			null: [],
		},
		dragon: {
			half: ["steel"],
			double: ["dragon"],
			null: ["fairy"],
		},
		dark: {
			half: ["fighting", "dark", "fairy"],
			double: ["ghost", "psychic"],
			null: [],
		},
		fairy: {
			half: ["poison", "steel", "fire"],
			double: ["fighting", "dragon", "dark"],
			null: [],
		},
	};

	defType.forEach((type) => {
		if (dataset[atkType].half.includes(type)) {
			returnVal *= 0.5;
		} else if (dataset[atkType].double.includes(type)) {
			returnVal *= 2;
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
	} else if (value == 2) {
		return "It's Super Effective! ";
	} else if (value == 4) {
		return "It's extremely effective! ";
	} else {
		return "";
	}
}

function cardDescription(type, value, defValue) {
	switch (type) {
		case "strike":
			return `Deals ${value} damage to target.`;
		case "shield":
			return `Grants ${defValue} shield to self.`;
		case "flash":
			return `Deals ${value} damage to target.`;
		case "heal":
			return `Heals ${defValue} to self.`;
		case "normal":
			return `Deals ${value} damage to target. Heals ${defValue} to self`;
		case "fire":
			return `Deals 220% ${value} damage to target.`;
		case "water":
			return `Deals 220% ${value} damage to target.`;
		case "grass":
			return `Deals 220% ${value} damage to target.`;
		case "bug":
			return `Grants ${defValue} shield to self. Grants 50 Evolution Points`;
		case "fighting":
			return `Deals 200% ${value} damage to target. Gain 5 STR`;
		case "dark":
			return `Deals 150% ${value} damage to target. Deal 2 Vulnerable`;
		case "poison":
			return `Deals 50% ${value} damage to target. Deal 3 Poison`;
		default:
			return `It's a card, alright.`;
	}
}

function say(nom, txt) {
	console.log(nom, " ", txt);
	output.innerHTML += nom + " " + txt;
}

class GameController {
	constructor(player, enem, deck) {
		this.player = player;
		this.enem = enem;
		this.deck = deck;
		this.combat = 1;
		this.gameState = "INTRODUCTION";
	}

	handlePlay(card) {
		if (this.gameState != "INTRODUCTION") return;
		card.play(this.enem, this.player);
		if (player.boosts.find((arr) => arr.includes("burn"))) {
			say(player.name, "is burned!");
			target.take(target.BURNval);
		}
	}

	handleStatus() {
		player.boosts.forEach((boost) => {
			if (boost) {
				boost[1] -= 1;
				if (boost[1] <= 0) {
					player.boosts.splice(player.boosts.indexOf(boost), 1);
				}
			}
		});
		console.log("player boosts", player.boosts);

		enem.boosts.forEach((boost) => {
			if (boost) {
				boost[1] -= 1;
				if (boost[1] <= 0) {
					enem.boosts.splice(enem.boosts.indexOf(boost), 1);
				}
			}
		});
		console.log("eenem boosts", enem.boosts);
	}

	endTurn() {
		if (this.enem.HP == 0) {
			this.gameState = "WIN";
			victoryLap();
		} else {
			this.gameState = "RETALIATION";
			console.log("turn ended");

			this.player.mana = this.player.maxmana;
			setTimeout(() => {
				console.log("Played Phase!");
				this.handleRetaliate();

				if (player.boosts.find((arr) => arr.includes("poison"))) {
					say(player.name, "is poisoned!");
					target.take(target.DOTval);
				}
				player.OHP = 0;
			}, 2000);
			player.evolve(this.deck.evoRemainderandFleetingRemoval());
			this.deck.createHand();
			this.handleStatus();
		}
	}

	handleRetaliate() {
		if (this.gameState != "RETALIATION") return;
		this.enem.retaliate(this.player);
		console.log("retaliation in game controller hit");
		if (this.player.HP == 0) {
			this.gameState = "LOSS";
		}
		this.gameState = "INTRODUCTION";
	}
}

export class Card {
	constructor(type, skill, value, cost, genre = "move") {
		//le genre est le type de le card (attaque ou une iteme), pas ce melangez avec des types de pokemon
		this.type = type;
		this.genre = genre;
		this.skill = skill;
		this.value = value;
		this.cost = cost;
		this.DefValue = value / 2;
		this.hasPlayed = false;
		this.fleeting = false;
	}

	play(target, self) {
		let outputVal = this.value;
		if (self.mana < this.cost) return;
		if (this.hasPlayed) return;
		if (self.signedSTR != 0) {
			outputVal += self.signedSTR;
		}
		if (self.boosts.find((arr) => arr.includes("weakness"))) {
			say(self.name, "is weakened! ");
			this.value *= 0.75;
		}

		if (this.genre == "move") {
			switch (this.skill) {
				case "strike":
					target.take(outputVal, this.type);
					break;
				case "shield":
					self.OSheal(this.DefValue, this.type);
					break;
				case "flash":
					target.take(outputVal, this.type);
					break;
				case "heal":
					self.heal(this.DefValue, this.type);
					break;
				default:
					skillCheck(
						self,
						target,
						this.type,
						this.skill,
						outputVal,
						this.DefValue,
					);
					break;
			}
		} else if (this.genre == "item") {
			itemCheck(self, target, this.type, this.skill, outputVal, this.DefValue);
			this.fleeting = true;
		}
		self.mana -= this.cost;
		this.hasPlayed = true;
		console.log(player.vals);
		console.log(enem.vals);
	}
}

export class Deck {
	constructor(cards) {
		this.cards = [
			new Card("", "strike", 20, 1),
			new Card("", "strike", 20, 1),
			new Card("normal", "potion", 20, 2, "item"),
			new Card("", "shield", 20, 3),
			new Card("", "shield", 20, 4),
			new Card("normal", "potion", 20, 2, "item"),
			new Card("normal", "potion", 20, 2, "item"),
			new Card("normal", "potion", 20, 2, "item"),
			new Card("flying", "flash", 20, 3),
			new Card("fighting", "fighting", 20, 5),
			new Card("bug", "bug", 20, 4),
			new Card("fire", "fire", 20, 2),
			new Card("dark", "dark", 20, 3),
		];
		this.hand = [];
		this.discardPile = [];
		this.shuffledCards = [];
		this.maxCardLimit = this.cards.length;
		let macroHand = this.cards;
		this.shuffledCards = shuffleArray(macroHand);
	}

	addCard(card) {
		this.cards.push(card);
		this.maxCardLimit++;
	}

	addABunchOfCards(newCards) {
		newCards.forEach((card) => {
			this.cards.push(card);
			this.maxCardLimit++;
		});
	}

	removeCard(card) {
		this.cards.splice(this.cards.indexOf(card), 1);
		this.hand.splice(this.hand.indexOf(card), 1);
		console.log(card, "removed yippeee???");
		this.maxCardLimit--;
	}

	createHand() {
		if (
			this.shuffledCards.length === 0 &&
			this.discardPile.length == this.maxCardLimit
		) {
			console.log("entered end of discard pile");
		}

		this.hand.forEach((card) => {
			card.hasPlayed = false;
			this.discardPile.push(card);
		});
		this.hand = [];

		while (this.hand.length < 5 && this.shuffledCards.length >= 0) {
			if (this.shuffledCards.length == 0) {
				this.discardPile.forEach((card) => {
					this.shuffledCards.push(card);
				});
				this.discardPile = [];
			}
			this.hand.push(this.shuffledCards.pop());
		}

		console.log("hand", this.hand);
		console.log("deck", this.shuffledCards);
		console.log("discard", this.discardPile);
		console.log("og deck", this.cards);
	}

	evoRemainderandFleetingRemoval() {
		let extraEvo = 0;
		this.hand.forEach((card) => {
			if (card.hasPlayed != true) {
				extraEvo += card.cost;
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
		this.boosts = [];
		this.DOTval = 0;
		this.BURNval = 0;
	}
	heal(value, type) {
		value = Math.round(value);
		if (type) {
			let ret = 1 / typeCheck(type, this.type);
			value *= ret;
			console.log(typeEffectLine(ret));
			output.innerHTML += typeEffectLine(ret);
		}
		this.HP += Math.round(value);
		if (this.HP > this.MaxHP) {
			this.HP = this.MaxHP;
		}
		console.log(this.name + " healed for " + value);
		output.innerHTML += this.name + " healed for " + value + "<br/>";
	}
	OSheal(value, type) {
		if (type) {
			let ret = 1 / typeCheck(type, this.type);
			value *= ret;
			console.log(typeEffectLine(ret));
			output.innerHTML += typeEffectLine(ret);
		}
		if (this.boosts.find((arr) => arr.includes("exalt"))) {
			say(this.name, "is exalt! ");
			value *= 1.25;
		}
		this.OHP += Math.round(value);
		console.log(this.name + " gained " + value + " shield");
		output.innerHTML += this.name + " gained " + value + " shield" + "<br/>";
	}
	take(value, type) {
		if (type) {
			let ret = typeCheck(type, this.type);
			value *= ret;
			console.log(typeEffectLine(ret));
			output.innerHTML += typeEffectLine(ret);
		}

		if (this.boosts.find((arr) => arr.includes("vulnerable"))) {
			say(this.name, "is vulnerable! ");
			value *= 1.25;
		}

		let negatifRemainder = (this.OHP -= Math.round(value));
		if (negatifRemainder < 0) {
			this.OHP = 0;
			this.HP += negatifRemainder;
		}
		console.log(this.name + " took " + value + " damage");
		output.innerHTML += this.name + " took " + value + " damage" + "<br/>";
	}
}

export class Player extends Unit {
	constructor(name, type, HP, OHP, MaxHP, evo, maxevo, mana, maxmana) {
		super(name, type, HP, OHP, MaxHP);
		this.evo = evo;
		this.maxevo = maxevo;
		this.mana = mana;
		this.maxmana = maxmana;
	}

	evolve(XP) {
		this.evo += XP;
		if (this.evo >= this.maxevo) this.evo -= this.maxevo;
		console.log("evolve");
	}

	get vals() {
		return [this.name, this.type, this.HP, this.MaxHP, this.OHP, this.MaxOHP];
	}
}

export class Enem extends Unit {
	constructor(name, type, HP, OHP, MaxHP, movelist) {
		super(name, type, HP, OHP, MaxHP);
		this.movelist = movelist;
	}

	retaliate(target) {
		let rand = Math.floor(getRandomNumber(0, this.movelist.length));
		console.log(rand);
		this.doMove(this.movelist[rand][0], this.movelist[rand][1], target);
	}

	doMove(atk, value, target) {
		switch (atk) {
			case "strike":
				target.take(value, this.type[0]);
				break;
			case "shield":
				this.OSheal(value, this.type[0]);
				break;
			case "heal":
				this.heal(value, this.type[0]);
				break;
			default:
				console.log("ability");
				break;
		}
		if (this.boosts.find((arr) => arr.includes("poison"))) {
			say(this.name, "is poisoned! ");
			this.take(this.DOTval);
		}
		this.gameState = "INTRODUCTION";
	}

	get vals() {
		return [this.name, this.type, this.HP, this.MaxHP, this.OHP, this.MaxOHP];
	}
}

function statusEffectsPush(statusArr, newEffect) {
	const existing = statusArr.find((item) => item.includes(newEffect[0]));
	if (existing) {
		existing[1] += newEffect[1];
	} else {
		statusArr.push(newEffect);
	}
}

function itemCheck(self, target, type, skill, value, defvalue) {
	switch (skill) {
		case "potion":
			self.heal(value, type);
			break;
	}
}

function skillCheck(self, target, type, skill, value, defvalue) {
	switch (skill) {
		case "normal":
			target.take(value, type);
			self.OSheal(value / 2, type);
			break;
		case "fire":
			target.take(value * 2.2, type);
			break;
		case "water":
			target.take(value * 2.2, type);
			break;
		case "grass":
			target.take(value * 2.2, type);
			break;
		case "bug":
			self.OSheal(defvalue, type);
			self.evo += 50;
			break;
		case "fighting":
			target.take(value * 2, type);
			self.signedSTR += 5;
			break;
		case "dark":
			target.take(value * 1.5, type);
			statusEffectsPush(target.boosts, ["vulnerable", 2]);
			break;
		case "poison":
			target.take(value / 2, type);
			target.DOTval = value / 2;
			statusEffectsPush(target.boosts, ["poison", 3]);
			break;
	}
}

export const player = new Player(
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
export const enem = new Enem("Guile", ["fire", "water"], 150, 10, 45, [
	["strike", 20],
]);
export const deck = new Deck();
export const game = new GameController(player, enem, deck);
deck.createHand();
