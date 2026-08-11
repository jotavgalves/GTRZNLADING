import { json, sessionCookie } from '../../_lib.js';
export async function onRequestPost({ request }) {
  return json({ ok:true }, 200, { 'set-cookie': sessionCookie(request, '', 0) });
}
