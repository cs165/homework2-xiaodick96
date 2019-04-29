const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};

function transformTextNodes(node) {
  // TODO(you): Implement this function! See HW spec for details.
    if(node.nodeType === Node.TEXT_NODE){
    let t = node.textContent;
    let s = t.split(' ');
    let ls = [];
    for(let i of s){
       ls.push(i.trim());
    }
    for(let i = 0; i<ls.length; i++){
      if(MATCH_LIST[ls[i]]){
        ls[i] = MATCH_LIST[ls[i]];
     }
    }
    node.textContent = ls.join(' ');   
  }
  for(const child of node.childNodes){
    //if(child.nodeName === 'SCRIPT')
    if(child.nodeName==='style' ||child.nodeName==='SCRIPT')
      continue;
    transformTextNodes(child);
  }
}

transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
