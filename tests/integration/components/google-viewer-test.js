import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | google viewer', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('renders with default values', async function(assert) {
    await render(hbs`{{ember-cli-google-viewer url="foo/bar"}}`);

    let container = this.$('> div');

    assert.ok(container.hasClass('ember-cli-google-viewer'), 'Has ember-cli-google-viewer class');

    let iframe = this.$('iframe');

    assert.equal(iframe.attr('width'), '100%');
    assert.equal(iframe.attr('height'), '100%');
    assert.ok(iframe.attr('src').includes('foo/bar'));
  });

  test('sets custom size', async function(assert) {
    await render(hbs`{{ember-cli-google-viewer url="foo/bar" width="300px" height="600px"}}`);

    let iframe = this.$('iframe');

    assert.equal(iframe.attr('width'), '300px');
    assert.equal(iframe.attr('height'), '600px');
  });

  test('shows loading text', async function(assert) {
    await render(hbs`
      {{#ember-cli-google-viewer}}
        Loading content...
      {{/ember-cli-google-viewer}}
    `);

    assert.dom('*').hasText('Loading content...');
  });

  test('fires loaded event', async function(assert) {
    let done = assert.async();

    this.actions.loaded = function() {
      done();
      assert.ok(true, 'component loaded');
    };

    await render(
      hbs`{{ember-cli-google-viewer url="http://infolab.stanford.edu/pub/papers/google.pdf" onViewerLoad=(action "loaded")}}`
    );
  });
});
