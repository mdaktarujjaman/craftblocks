/**
 * WordPress dependencies.
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit( { attributes, setAttributes } ) {
	const { heading } = attributes;

	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<RichText
				tagName="h1"
				value={ heading }
				onChange={ ( newHeading ) => setAttributes( { heading: newHeading } ) }
				placeholder="Enter heading..."
			/>
		</div>
	);
}