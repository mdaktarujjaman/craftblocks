/**
 * WordPress dependencies.
 */
import { PanelBody, ColorPicker } from '@wordpress/components';

/**
 * Reusable Color panel for the block Inspector sidebar.
 *
 * @param {Object}   props
 * @param {string}   props.textColor         Current text color (hex).
 * @param {string}   props.hoverColor        Current hover color (hex).
 * @param {Function} props.onTextColorChange  Callback when text color changes.
 * @param {Function} props.onHoverColorChange Callback when hover color changes.
 * @param {string}   [props.title]           Panel title. Defaults to "Color".
 * @param {boolean}  [props.showHover]       Whether to show the hover color picker. Defaults to true.
 * @return {JSX.Element} Color controls panel.
 */
export default function ColorControls( {
	textColor,
	hoverColor,
	onTextColorChange,
	onHoverColorChange,
	title = 'Color',
	showHover = true,
} ) {
	return (
		<PanelBody title={ title } initialOpen={ false }>
			<p className="craftblocks-color-label">Text Color</p>
			<ColorPicker
				color={ textColor }
				onChange={ onTextColorChange }
				enableAlpha={ false }
				defaultView="hex"
			/>

			{ showHover && (
				<>
					<p className="craftblocks-color-label">Hover Color</p>
					<ColorPicker
						color={ hoverColor }
						onChange={ onHoverColorChange }
						enableAlpha={ false }
						defaultView="hex"
					/>
				</>
			) }
		</PanelBody>
	);
}