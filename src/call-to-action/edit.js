/**
 * WordPress dependencies.
 */
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, ColorPicker } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		title,
		description,
		buttonText,
		backgroundColor,
		useGradient,
		gradientColorStart,
		gradientColorEnd,
	} = attributes;

	const backgroundStyle = useGradient
		? {
				backgroundImage:
					'linear-gradient(135deg, ' +
					gradientColorStart +
					', ' +
					gradientColorEnd +
					')',
		  }
		: { backgroundColor };

	const blockProps = useBlockProps( {
		style: backgroundStyle,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title="Background Settings" initialOpen={ true }>
					<ToggleControl
						label="Use Gradient"
						checked={ useGradient }
						onChange={ ( value ) => setAttributes( { useGradient: value } ) }
					/>

					{ ! useGradient && (
						<>
							<p className="craftblocks-color-label">Background Color</p>
							<ColorPicker
								color={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
								enableAlpha={ false }
								defaultView="hex"
							/>
						</>
					) }

					{ useGradient && (
						<>
							<p className="craftblocks-color-label">Gradient Start Color</p>
							<ColorPicker
								color={ gradientColorStart }
								onChange={ ( value ) => setAttributes( { gradientColorStart: value } ) }
								enableAlpha={ false }
								defaultView="hex"
							/>

							<p className="craftblocks-color-label">Gradient End Color</p>
							<ColorPicker
								color={ gradientColorEnd }
								onChange={ ( value ) => setAttributes( { gradientColorEnd: value } ) }
								enableAlpha={ false }
								defaultView="hex"
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					tagName="h2"
					className="craftblocks-cta-title"
					value={ title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
					placeholder="Enter title..."
				/>

				<RichText
					tagName="p"
					className="craftblocks-cta-description"
					value={ description }
					onChange={ ( value ) => setAttributes( { description: value } ) }
					placeholder="Enter description..."
				/>

				<RichText
					tagName="span"
					className="craftblocks-cta-button"
					value={ buttonText }
					onChange={ ( value ) => setAttributes( { buttonText: value } ) }
					placeholder="Button text..."
				/>
			</div>
		</>
	);
}