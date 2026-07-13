/**
 * WordPress dependencies.
 */
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';

const FONT_FAMILIES = [
	{ label: 'Default (Theme Font)', value: 'inherit' },
	{ label: 'Arial', value: 'Arial, sans-serif' },
	{ label: 'Georgia', value: 'Georgia, serif' },
	{ label: 'Helvetica', value: 'Helvetica, Arial, sans-serif' },
	{ label: 'Times New Roman', value: '"Times New Roman", serif' },
	{ label: 'Verdana', value: 'Verdana, sans-serif' },
	{ label: 'Courier New', value: '"Courier New", monospace' },
];

const FONT_WEIGHTS = [
	{ label: 'Normal (400)', value: '400' },
	{ label: 'Medium (500)', value: '500' },
	{ label: 'Semi-Bold (600)', value: '600' },
	{ label: 'Bold (700)', value: '700' },
];

/**
 * Reusable Typography panel for the block Inspector sidebar.
 *
 * @param {Object}   props
 * @param {string}   props.fontFamily       Current font-family value.
 * @param {number}   props.fontSize         Current font-size value (in px).
 * @param {string}   props.fontWeight       Current font-weight value.
 * @param {number}   props.lineHeight       Current line-height value (unitless, e.g. 1.5).
 * @param {Function} props.onFontFamilyChange Callback when font-family changes.
 * @param {Function} props.onFontSizeChange   Callback when font-size changes.
 * @param {Function} props.onFontWeightChange Callback when font-weight changes.
 * @param {Function} props.onLineHeightChange Callback when line-height changes.
 * @param {string}   [props.title]          Panel title. Defaults to "Typography".
 * @return {JSX.Element} Typography controls panel.
 */
export default function TypographyControls( {
	fontFamily,
	fontSize,
	fontWeight,
	lineHeight,
	onFontFamilyChange,
	onFontSizeChange,
	onFontWeightChange,
	onLineHeightChange,
	title = 'Typography',
} ) {
	return (
		<PanelBody title={ title } initialOpen={ false }>
			<SelectControl
				label="Font Family"
				value={ fontFamily }
				options={ FONT_FAMILIES }
				onChange={ onFontFamilyChange }
			/>

			<RangeControl
				label="Font Size (px)"
				value={ fontSize }
				onChange={ onFontSizeChange }
				min={ 10 }
				max={ 80 }
			/>

			<SelectControl
				label="Font Weight"
				value={ fontWeight }
				options={ FONT_WEIGHTS }
				onChange={ onFontWeightChange }
			/>

			<RangeControl
				label="Line Height"
				value={ lineHeight }
				onChange={ onLineHeightChange }
				min={ 1 }
				max={ 2.5 }
				step={ 0.1 }
			/>
		</PanelBody>
	);
}