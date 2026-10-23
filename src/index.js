import {array,text,unique,money,amount,date,escape,table} from './util.js';
export const guide='Supply practice, currency (GBP) and fees: id, category, label, price_type (exact/from/range/quote), reviewed_on and approved_note. exact/from require amount; range requires min_amount and max_amount. Amounts are decimal strings.';
export function analyse(input){
 text(input.practice,'practice');if(input.currency!=='GBP')throw Error('First release supports GBP');
 const fees=unique(array(input.fees,'fees'),'id').map(row=>{
  text(row.category,'category');text(row.label,'label');date(row.reviewed_on,'reviewed_on');
  let value;
  switch(row.price_type){
   case 'exact':case 'from':if(row.min_amount!=null||row.max_amount!=null)throw Error('Exact/from fee must not include range fields');value=(row.price_type==='from'?'From ':'')+money(row.amount,input.currency);break;
   case 'range':if(row.amount!=null)throw Error('Range must not include a single amount');if(amount(row.min_amount)>amount(row.max_amount))throw Error('Range minimum exceeds maximum');value=money(row.min_amount,input.currency)+' to '+money(row.max_amount,input.currency);break;
   case 'quote':if(row.amount!=null||row.min_amount!=null||row.max_amount!=null)throw Error('Quote-required fee must not contain amounts');value='Quote after discussion';break;
   default:throw Error('Unknown price_type');
  }
  return {...row,display:value};
 });
 return {title:input.practice+' fee list',summary:'Fictional example values are not price guidance. The formatter publishes approved input, not clinical or regulatory advice.',fees,issues:[],markdown:fees.map(f=>'- '+f.label+': '+f.display+'; reviewed '+f.reviewed_on+(f.approved_note?'; '+f.approved_note:'')).join('\n')};
}
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p>'+[...new Set(r.fees.map(f=>f.category))].map(c=>'<section><h3>'+escape(c)+'</h3>'+table(['Service','Fee','Approved note','Reviewed'],r.fees.filter(f=>f.category===c).map(f=>[f.label,f.display,f.approved_note||'No additional note supplied',f.reviewed_on]))+'</section>').join('');
