import elementHasRequiredTrackingProps from './element-has-required-tracking-props';
import eventpropHasTrackingEvent from './eventprop-has-tracking-event';

const allRules = {
    'eventprop-has-tracking-event': eventpropHasTrackingEvent,
    'element-has-required-tracking-props': elementHasRequiredTrackingProps,
};

export default allRules;
