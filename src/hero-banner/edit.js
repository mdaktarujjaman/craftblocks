/**
 * WordPress dependencies.
 */

import TypographyControls from '../shared/components/TypographyControls';
import ColorControls from '../shared/components/ColorControls';
import SpacingControls from '../shared/components/SpacingControls';

// WordPress dependencies.
import {
	useBlockProps,
	RichText,
	MediaUpload,
	MediaUploadCheck,
	InspectorControls,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	Button,
	Popover,
	PanelBody,
	RangeControl,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit( { attributes, setAttributes } ) {
	const {
		heading,
		subHeading,
		buttonText,
		buttonUrl,
		backgroundImageUrl,
		overlayOpacity,
		contentAlignment,
		headingFontFamily,
		headingFontSize,
		headingFontWeight,
		headingLineHeight,
		headingTextColor,
		blockPadding,
		blockMargin,
		blockBorderRadius,
		blockShadow,
	} = attributes;

	const [ isLinkPickerOpen, setIsLinkPickerOpen ] = useState( false );

	const blockProps = useBlockProps( {
		className: `craftblocks-align-${ contentAlignment }`,
		style: {
			backgroundImage: backgroundImageUrl ? `url(${ backgroundImageUrl })` : undefined,
			padding: blockPadding + 'px',
			margin: blockMargin + 'px',
			borderRadius: blockBorderRadius + 'px',
			boxShadow: blockShadow !== 'none' ? blockShadow : undefined,
		},
	} );

	const onSelectImage = ( media ) => {
		setAttributes( { backgroundImageUrl: media.url } );
	};

	const onRemoveImage = () => {
		setAttributes( { backgroundImageUrl: '' } );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title="Background Settings" initialOpen={ true }>
					<RangeControl
						label="Overlay Opacity"
						value={ overlayOpacity }
						onChange={ ( newValue ) => setAttributes( { overlayOpacity: newValue } ) }
						min={ 0 }
						max={ 100 }
					/>
				</PanelBody>

				<PanelBody title="Layout Settings" initialOpen={ true }>
					<ToggleGroupControl
						label="Content Alignment"
						value={ contentAlignment }
						onChange={ ( newValue ) => setAttributes( { contentAlignment: newValue } ) }
						isBlock
					>
						<ToggleGroupControlOption value="left" label="Left" />
						<ToggleGroupControlOption value="center" label="Center" />
						<ToggleGroupControlOption value="right" label="Right" />
					</ToggleGroupControl>
				</PanelBody>
				<TypographyControls
					title="Heading Typography"
					fontFamily={ headingFontFamily }
					fontSize={ headingFontSize }
					fontWeight={ headingFontWeight }
					lineHeight={ headingLineHeight }
					onFontFamilyChange={ ( value ) => setAttributes( { headingFontFamily: value } ) }
					onFontSizeChange={ ( value ) => setAttributes( { headingFontSize: value } ) }
					onFontWeightChange={ ( value ) => setAttributes( { headingFontWeight: value } ) }
					onLineHeightChange={ ( value ) => setAttributes( { headingLineHeight: value } ) }
				/>
				<ColorControls
					title="Heading Color"
					textColor={ headingTextColor }
					onTextColorChange={ ( value ) => setAttributes( { headingTextColor: value } ) }
					showHover={ false }
				/>
				<SpacingControls
					padding={ blockPadding }
					margin={ blockMargin }
					borderRadius={ blockBorderRadius }
					shadow={ blockShadow }
					onPaddingChange={ ( value ) => setAttributes( { blockPadding: value } ) }
					onMarginChange={ ( value ) => setAttributes( { blockMargin: value } ) }
					onBorderRadiusChange={ ( value ) => setAttributes( { blockBorderRadius: value } ) }
					onShadowChange={ ( value ) => setAttributes( { blockShadow: value } ) }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className="craftblocks-hero-overlay"
					style={ { opacity: overlayOpacity / 100 } }
				/>

				<div className="craftblocks-hero-content">
					<RichText
						tagName="h1"
						className="craftblocks-hero-heading"
						value={ heading }
						onChange={ ( newHeading ) => setAttributes( { heading: newHeading } ) }
						placeholder="Enter heading..."
						style={ {
							fontFamily: headingFontFamily,
							fontSize: headingFontSize + 'px',
							fontWeight: headingFontWeight,
							lineHeight: headingLineHeight,
							color: headingTextColor,
						} }
					/>

					<RichText
						tagName="p"
						className="craftblocks-hero-subheading"
						value={ subHeading }
						onChange={ ( newSubHeading ) => setAttributes( { subHeading: newSubHeading } ) }
						placeholder="Enter subheading..."
					/>

					<div className="craftblocks-hero-button-wrapper">
						<Button
							variant="secondary"
							className="craftblocks-hero-button"
							onClick={ () => setIsLinkPickerOpen( true ) }
						>
							<RichText
								tagName="span"
								value={ buttonText }
								onChange={ ( newButtonText ) => setAttributes( { buttonText: newButtonText } ) }
								placeholder="Button text..."
							/>
						</Button>

						{ isLinkPickerOpen && (
							<Popover onClose={ () => setIsLinkPickerOpen( false ) }>
								<LinkControl
									value={ { url: buttonUrl } }
									onChange={ ( newLink ) => setAttributes( { buttonUrl: newLink.url } ) }
								/>
							</Popover>
						) }
					</div>

					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ backgroundImageUrl }
							render={ ( { open } ) => (
								<div className="craftblocks-hero-media-controls">
									<Button variant="secondary" onClick={ open }>
										{ backgroundImageUrl ? 'Change Background' : 'Set Background Image' }
									</Button>
									{ backgroundImageUrl && (
										<Button variant="link" isDestructive onClick={ onRemoveImage }>
											Remove
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</div>
			</div>
		</>
	);
}