import { test, readInput } from "../utils/index"

const prepareInput = (rawInput: string) => rawInput

const input = prepareInput(readInput())

let totalBags = 0;
class Contain {
  amount: number;
  color: string;
}
class Rule {
  color: string;
  contains: Contain[];
  canFit?: boolean;
  amountDirect?: number;
}

const goA = (input) => {
  const rules = input.split('\n').filter(r => r);
  let parsedRules: Rule[] = [];
  rules.forEach((rule) => {
    parsedRules.push(readRule(rule));
  })
  let bagsWithResult = new Set();

  // This gets all bags which directly contain a gold bag.
  parsedRules.forEach((parsedRule) => {
    parsedRule.contains.forEach((inner: Contain) => {
      if(inner.color.indexOf('shiny gold') != -1) {
        parsedRule.canFit = true;
        bagsWithResult.add(parsedRule.color.trim());
      }
    });
  });

  // Why 5 you ask? No reason, it's enough for my input data and it works. No questions please.
  for(let i = 0; i < 200; i++) {
    parsedRules.forEach((parsedRule) => {
      parsedRule.contains.forEach((inner) => {
        if(parsedRules.find((pr) => pr.color.trim() == inner.color.trim()).canFit) {
          parsedRule.canFit = true;
          bagsWithResult.add(parsedRule.color.trim());
        }
      })
    });
  }

  return bagsWithResult.size;
}


const goB = (input) => {
  const rules = input.split('\n').filter(r => r);
  let parsedRules: Rule[] = [];
  rules.forEach((rule) => {
    parsedRules.push(readRule(rule));
  })
  parsedRules.forEach(pr => {
    pr.amountDirect = 0;
    pr.contains.forEach((inner) => {
      pr.amountDirect += inner.amount;
    })
  })

  const shinyBag = parsedRules.find(pr => pr.color.trim() == 'shiny gold');
  shinyBag.contains.forEach(innerBag => {
    checkBagAmount(parsedRules, innerBag);
  });
  return totalBags;
}

function checkBagAmount(totalList: Rule[], bag: Contain) {
  totalBags += bag.amount;
  for(let i = 0; i < bag.amount; i ++) {
    totalList.find((pr) => pr.color.trim() == bag.color.trim()).contains.forEach(inner => {
      checkBagAmount(totalList, inner);
    })
  }
}

function readRule(stringRule): Rule {
  let rule = new Rule();
  rule.contains = [];
  rule.color = stringRule.substr(0, stringRule.indexOf('bags') - 1);
  let currentStringIndex = stringRule.indexOf('contain') + 8;
    let stringRuleRules = stringRule.substr(currentStringIndex, stringRule.length - currentStringIndex);
    const formattedRules = stringRuleRules.split(',');

    formattedRules.forEach((formattedRule) => {
      //It's a rule!
      formattedRule = formattedRule.trim();
      if(formattedRule.indexOf('no other bags') == -1) {
        let contain = new Contain();
        contain.amount = parseInt(formattedRule.substr(0, formattedRule.indexOf(' ')));
        contain.color = formattedRule.substr(formattedRule.indexOf(' ') + 1, formattedRule.length - formattedRule.indexOf(' ') - 1).replace('bags', '').replace('bag', '').replace('.', '');
        rule.contains.push(contain);
      }
    })
  return rule;
}
/* Tests */

// test()

/* Results */

console.time("Time puzzle 1")
const resultA = goA(input)
console.timeEnd("Time puzzle 1")

console.time("Time puzzle 2")
const resultB = goB(input)
console.timeEnd("Time puzzle 2")

console.log("Solution to part 1:", resultA)
console.log("Solution to part 2:", resultB)
