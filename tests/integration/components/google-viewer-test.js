import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('google-viewer', 'Integration | Component | google viewer', {
  integration: true
});

test('renders with default values', function(assert) {
  this.render(hbs`{{ember-cli-google-viewer url="foo/bar"}}`);

  let container = this.$('> div');

  assert.ok(container.hasClass('ember-cli-google-viewer'), 'Has ember-cli-google-viewer class');

  let iframe = this.$('iframe');

  assert.equal(iframe.attr('width'), '100%');
  assert.equal(iframe.attr('height'), '100%');
  assert.ok(iframe.attr('src').includes('foo/bar'));
});

test('sets custom size', function(assert) {
  this.render(hbs`{{ember-cli-google-viewer url="foo/bar" width="300px" height="600px"}}`);

  let iframe = this.$('iframe');

  assert.equal(iframe.attr('width'), '300px');
  assert.equal(iframe.attr('height'), '600px');
});

test('shows loading text', function(assert) {
  this.render(hbs`
    {{#ember-cli-google-viewer}}
      Loading content...
    {{/ember-cli-google-viewer}}
  `);

  assert.equal(this.$().text().trim(), 'Loading content...');
});

test('fires loaded event', function(assert) {
  let done = assert.async();

  this.on('loaded', function() {
    done();
    assert.ok(true, 'component loaded');
  });

  this.render(hbs`{{ember-cli-google-viewer url="http://infolab.stanford.edu/pub/papers/google.pdf" onViewerLoad=(action "loaded")}}`);
});
