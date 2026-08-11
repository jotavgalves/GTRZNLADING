import { getConfig, json } from '../_lib.js';
export async function onRequestGet({ env }) {
  try {
    const config = await getConfig(env);
    return json({ ok:true, config }, 200, { 'cache-control':'public, max-age=30, s-maxage=60' });
  } catch (error) {
    return json({ ok:true, config:null, warning:String(error?.message || error) }, 200);
  }
}
