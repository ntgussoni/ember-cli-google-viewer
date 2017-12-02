import Component from '@ember/component';
import layout from '../templates/components/ember-cli-google-viewer';
import { isNone } from '@ember/utils'
import { htmlSafe } from '@ember/string';

export default Component.extend({
  classNames: ['ember-cli-google-viewer'],
  layout,
  url: null,
  width: '100%',
  height: '100%',
  pid: 'explorer',
  ehf: false,
  a: 'v',
  chrome: false,
  embedded: true,
  isLoading: true,
  display: htmlSafe('display:none;'),

  actions: {
    iFrameLoaded() {
      this.setProperties({
        isLoading: false,
        display: htmlSafe('display:block;')
      });
      if (!isNone(this.get('onViewerLoad'))) {
        this.get('onViewerLoad')();
      }
    }
  }
});
