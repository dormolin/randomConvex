import app from './app.svelte'
import { mount } from 'svelte'

mount(app, {
    target: document.getElementById('AppContainer')!
})
