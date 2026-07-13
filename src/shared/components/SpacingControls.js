/**
 * WordPress dependencies.
 */
import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';

const SHADOW_PRESETS = [
	{ label: 'None', value: 'none' },
	{ label: 'Small', value: '0 2px 6px rgba(0, 0, 0, 0.08)' },
	{ label: 'Medium', value: '0 8px 20px rgba(0, 0, 0, 0.12)' },
	{ label: 'Large', value: '0 16px 40px rgba(0, 0, 0, 0.18)' },
];

/**
 * Reusable Spacing panel (padding, margin, border radius, shadow)
 * for the block Inspector sidebar.
 *
 * @param {Object}   props
 * @param {number}   props.padding          Current padding value (in px).
 * @param {number}   props.margin           Current margin value (in px).
 * @param {number}   props.borderRadius     Current border-radius value (in px).
 * @param {string}   props.shadow           Current box-shadow value (CSS string or 'none').
 * @param {Function} props.onPaddingChange      Callback when padding changes.
 * @param {Function} props.onMarginChange       Callback when margin changes.
 * @param {Function} props.onBorderRadiusChange Callback when border-radius changes.
 * @param {Function} props.onShadowChange       Callback when shadow changes.
 * @param {string}   [props.title]          Panel title. Defaults to "Spacing & Effects".
 * @return {JSX.Element} Spacing controls panel.
 */
export default function SpacingControls( {
	padding,
	margin,
	borderRadius,
	shadow,
	onPaddingChange,
	onMarginChange,
	onBorderRadiusChange,
	onShadowChange,
	title = 'Spacing & Effects',
} ) {
	return (
		<PanelBody title={ title } initialOpen={ false }>
			<RangeControl
				label="Padding (px)"
				value={ padding }
				onChange={ onPaddingChange }
				min={ 0 }
				max={ 120 }
			/>

			<RangeControl
				label="Margin (px)"
				value={ margin }
				onChange={ onMarginChange }
				min={ 0 }
				max={ 120 }
			/>

			<RangeControl
				label="Border Radius (px)"
				value={ borderRadius }
				onChange={ onBorderRadiusChange }
				min={ 0 }
				max={ 60 }
			/>

			<SelectControl
				label="Shadow"
				value={ shadow }
				options={ SHADOW_PRESETS }
				onChange={ onShadowChange }
			/>
		</PanelBody>
	);
}